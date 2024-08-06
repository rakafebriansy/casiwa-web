import Navbar from "../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";
import SquareButton from "../components/Elements/SquareButton";
import Footer from "../components/Layout/Footer";
import { hasDocumentUser } from "../../services/auth.authenticatedUser.jsx";
import { AnchorListContext } from "../contexts/AnchorList";
import { useContext, useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { getCookie, parseDate } from "../functions/main";
import { useParams } from 'react-router-dom';
import { downloadNote, getSingleNote, getSingleNotePreview } from "../../services/util.notes.jsx";
GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';
import Modal from "../components/Elements/Modal";
import { getPaymentToken, updateFreeDownload } from "../../services/util.payment.jsx";
import { ShowAlertContext } from "../contexts/ShowAlert.jsx";
import { LeftArrowIcon, LoadingIcon, RightArrowIcon } from '../functions/svgs';
import Alert from "../components/Elements/Alert";


const NoteDetailsPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isBought, setIsBought] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [free_download, setFreeDownload] = useState(0);
    const [note, setNote] = useState({});
    const [snapToken, setSnapToken] = useState('');
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [pageIsRendering, setPageIsRendering] = useState(false);
    const {anchorList} = useContext(AnchorListContext);
    const {isShowAlert} = useContext(ShowAlertContext);
    const refPdfCanvas = useRef(null);
    const refModal = useRef(null);
    const {idParams} = useParams();
    const navigate = useNavigate();

    const renderPage = (num, ctx, scale) => {
        if (!pdfDoc || !refPdfCanvas.current || !ctx) {
            return;
        }
        if (pageIsRendering) {
            return;
        }
        setPageIsRendering(true);
        pdfDoc.getPage(num).then(page => {
            const viewport = page.getViewport({
                scale
            });
            refPdfCanvas.current.height = viewport.height;
            refPdfCanvas.current.width = viewport.width;
            const renderCtx = {
                canvasContext: ctx,
                viewport
            };
            page.render(renderCtx).promise.then(() => { 
                setPageIsRendering(false);
            }).catch((err) => {
                console.error('Render error:', err);
                setPageIsRendering(false);
            });
        }).catch((err) => {
            console.error('Page retrieval error:', err);
            setPageIsRendering(false);
        });
    };
 
    const showPrevPage = () => {
        if(pageNum <= 1) { 
            return;
        }
        setPageNum(pageNum - 1);
    }
    
    const showNextPage = () => {
        if(pageNum >= pdfDoc.numPages) { 
            return;
        }
        setPageNum(pageNum + 1);
    }
    const handlePaymentToken = async () => {
        const userData = getCookie('user');
        getPaymentToken((data) => {
            refModal.current.classList.replace('hidden','flex');
            setSnapToken(data.snap_token);
        }, userData.token, idParams, note.price);
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        refModal.current.classList.replace('flex','hidden');
        if (window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: async function (result) {
                    setIsBought(true);
                    console.log(result)
                },
                onPending: function (result) {
                    console.log(result)
                },
                onError: function (result) {
                    console.log(result)
                }
        });
        }
    }

    const handleDownload = async (e) => {
        e.preventDefault();
        const userData = getCookie('user');
        downloadNote(note.file_name, userData.token);
    }

    const handleFreeDownload = async (e) => {
        e.preventDefault();
        const userData = getCookie('user');
        updateFreeDownload(userData.token, {id: idParams},(data) => {
            if(data.success) {
                getSingleNote(idParams, data => {
                    setNote(data);
                    setIsBought(true);
                });
            }
        },
        err => {
            console.log(err);
        });
    }

    useEffect(()=> {
        const userData = getCookie('user');
        if(userData) {
            hasDocumentUser(userData.token, idParams,res => 
                {
                if(res.data.success) {
                    setIsLogin(res.data.data.login);
                    setIsBought(res.data.data.bought);
                    setFreeDownload(res.data.data.free_download);
                    if(res.data.data.bought) {
                        getSingleNote(idParams, data => {
                            setNote(data);
                        });
                    } else {
                        getSingleNotePreview(idParams, (data) => {
                            setNote(data);
                        });
                    }
                }
            }, 
            err => {
                getSingleNotePreview(idParams, (data) => {
                    setNote(data);
                });
            }, 
            () => {
                const script = document.createElement('script');
                script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
                script.dataset.clientKey = import.meta.env.MIDTRANS_CLIENT_KEY;
                script.async = true;
                document.body.appendChild(script);

                setIsLoading(false);

                return () => {
                document.body.removeChild(script);
                };
            });
        }
    },[]);

    useEffect(() => {
        if(isBought && Object.keys(note).length > 0) {
            getDocument(import.meta.env.VITE_BASE_URL + 'document/' + note.file_name).promise.then(pdfDoc_ => {
                setPdfDoc(pdfDoc_);
                const ctx = refPdfCanvas.current.getContext('2d');
                const scale = 1.5;
                if(ctx) {
                    renderPage(pageNum, ctx, scale);
                }
            })
             .catch(err => {
                console.error('Error loading document:', err);
            });
        }
    },[note]);
 
    useEffect(() => {
        if(!pageIsRendering) {
            if (isBought && pdfDoc && refPdfCanvas.current) {
                const ctx = refPdfCanvas.current.getContext('2d');
                const scale = 1.5;
                renderPage(pageNum, ctx, scale);
            }
        }
    }, [pdfDoc, pageNum]); 

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );
    return (
        <>
            {note.title && (
            <>
            <Navbar anchors={anchorList[0]} isLogin={isLogin} /> 
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            <section className="pt-20 flex lg:pt-28 flex-col items-center justify-center gap-5 lg:gap-10 font-montserratRegular">
                <div className="w-[80%] gap-3 flex flex-col">
                    <div className="flex w-full items-start">
                        <button onClick={() => {navigate(-1)}} className="text-blue-500 text-xs lg:text-sm ">&lt;&lt; <span className="hover:underline">Kembali ke Catatan</span></button>
                    </div>
                    <div className="flex flex-col items-start text-sm gap-3 lg:gap-4">
                        <h1 className="text-xl font-montserratBold lg:text-3xl">{note.title}</h1>
                        <p className="lg:text-base">{note.description}</p>
                        <div className="flex flex-col text-xs lg:text-sm">
                            <p>Oleh: {`${note.name}, ${note.study_program}, ${note.university}`}</p>
                            <p className="font-montserratSemiBold">{parseDate(note.date)}</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-start mt-5">
                        <div className="flex flex-col items-end gap-4 lg:gap-6  lg:w-[80%]">
                            {!isLogin && (
                                <SquareButton type="link" colorCode="bg-primary" path='/login' >Beli</SquareButton>
                            )}
                            {isLogin && !isBought && free_download > 0 && (
                                <SquareButton type="button" colorCode="bg-yellow-600" onclick={handleFreeDownload} >Beli Gratis</SquareButton>
                            )}
                            {isLogin && !isBought && free_download == 0 && (
                                <SquareButton type="button" colorCode="bg-primary" onclick={handlePaymentToken} >Beli</SquareButton>
                            )}
                            {isLogin && isBought && (
                                <SquareButton type="button" colorCode="bg-primary" onclick={handleDownload} >Unduh</SquareButton>
                            )}
                            <div className="bg-backgroundPrime w-full h-[35rem] lg:h-[65rem] relative small-shadow ">
                                {isBought ? (
                                    <canvas ref={refPdfCanvas} id="pdf-render" className="w-full h-full"></canvas>
                                ) : (
                                    <img src={import.meta.env.VITE_BASE_URL + 'preview/' + note.thumbnail_name} className="w-full h-full" alt="" />
                                )}
                                {isBought ? (
                                    <div className="absolute  text-primary text-xs flex bg-white p-2 lg:py-3 lg:px-5 small-shadow gap-2 lg:gap-3 items-center justify-between w-full bottom-0 lg:text-base">
                                        {pdfDoc ? (
                                            <div>
                                                <span className="font-montserratBold">{pageNum}</span> dari {pdfDoc.numPages}
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="font-montserratBold">0</span> dari 0
                                            </div>
                                        )}
                                        {!pageIsRendering ? (
                                            <div className="flex justify-between">
                                                <LeftArrowIcon classname="w-5 lg:w-7" onclick={showPrevPage}/>
                                                <RightArrowIcon classname="w-5 lg:w-7" onclick={showNextPage}/>
                                            </div>
                                        ) : (
                                            <div className="flex justify-between text-primary">
                                                ...
                                            </div>
                                            
                                        )}
                                    </div>
                                ) : (
                                    <div className="absolute flex bg-white py-3 small-shadow flex-col gap-2 lg:gap-3 items-center w-full bottom-0 text-sm lg:text-base">
                                        <p className="font-montserratSemiBold">Preview</p>
                                        <p className="text-xs lg:text-sm">{isLogin ? 'Silahkan beli terlebih dahulu' : 'Login untuk mengunduh'}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
            <Modal ref={refModal} title="Pembayaran" accept="Bayar sekarang" onsubmit={handlePayment}>
                <table>
                    <tbody className="align-top">
                        <tr>
                            <td className="p-1">Judul:</td>
                            <td className="p-1">{note.title}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Deskripsi:</td>
                            <td className="p-1">{note.description}</td>
                        </tr>
                        <tr>
                            <td className="p-1">Harga:</td>
                            <td className="p-1">Rp 2500</td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
            </>
        )}
        </>
    );
};

export default NoteDetailsPage;