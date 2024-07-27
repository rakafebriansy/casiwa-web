import Navbar from "../components/Layout/Navbar";
import { Link, useNavigate } from "react-router-dom";
import SquareButton from "../components/Elements/SquareButton";
import Footer from "../components/Layout/Footer";
import { hasDocumentUser } from "../../services/auth.authenticatedUser.jsx";
import { AnchorListContext } from "../contexts/AnchorList";
import { useContext, useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { getCookie, parseDate } from "../functions/main";
import { useParams } from 'react-router-dom';
import { getSingleNote, getSingleNotePreview } from "../../services/util.notes.jsx";
GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';
import Modal from "../components/Elements/Modal";
import { getPaymentToken } from "../../services/util.payment.jsx";
import { ShowAlertContext } from "../contexts/ShowAlert.jsx";
import { LoadingIcon } from '../functions/svgs';

const NoteDetailsPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isBought, setIsBought] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [note, setNote] = useState({});
    const [snapToken, setSnapToken] = useState('');
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [pageIsRendering, setPageIsRendering] = useState(false);
    const [pageNumIsPending, setPageNumIsPending] = useState(null);
    const {anchorList} = useContext(AnchorListContext);
    const {isShowAlert} = useContext(ShowAlertContext);
    const refPdfCanvas = useRef(null);
    const refModal = useRef(null);
    const {idParams} = useParams();

    const renderPage = (num, ctx, scale = 1.5) => {
        if (!pdfDoc || !refPdfCanvas.current || !ctx) {
            return;
        }

        if(pageIsRendering) {
            setPageNumIsPending(num);
        } else {
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
        
                    if(pageNumIsPending !== null) {
                        renderPage(pageNumIsPending, ctx, scale);
                        setPageNumIsPending(null); 
                    }
                });
            });
        }
    };
    
    const queueRenderPage = num => {
        if(pageIsRendering) {
            setPageNumIsPending(num);
        } else {
            renderPage(num, ctx, scale);
        }
    }
    
    const showPrevPage = () => {
        if(pageNum <= 1) { 
            return;
        }
        setPageNum(pageNum - 1);
        queueRenderPage(pageNum);
    }
    
    const showNextPage = () => {
        if(pageNum >= pdfDoc.numPages) { 
            return;
        }
        setPageNum(pageNum + 1);
        queueRenderPage(pageNum);
    }

    const handlePaymentToken = async () => {
        const userData = getCookie('user');
        getPaymentToken((data) => {
            refModal.current.classList.replace('hidden','flex');
            setSnapToken(data.snap_token);
        }, userData.token, idParams, 2500);
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        console.log('ok')
        refModal.current.classList.replace('flex','hidden');
        if (window.snap) {
            window.snap.pay(snapToken, {
                onSuccess: async function (result) {
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

    useEffect(()=> {
        const userData = getCookie('user');
        if(userData) {
            hasDocumentUser(userData.token, idParams,res => 
                {
                if(res.data.success) {
                    setIsLogin(res.data.data.login);
                    setIsBought(res.data.data.bought);
                    if(res.data.data.bought) {
                        const userData = getCookie('user');
                        getSingleNote(idParams, userData.token, data => {
                            console.log(data)
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
                if(ctx) {
                    renderPage(pageNum, ctx, 1.5);
                }
            })
             .catch(err => {
                console.error(err);
            });
        }
    },[note]);

    useEffect(() => {
        if (isBought && pdfDoc && refPdfCanvas.current) {
            const ctx = refPdfCanvas.current.getContext('2d');
            if (ctx) { 
                renderPage(pageNum, ctx, 1.5);
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
            <Navbar anchors={anchorList} isThisPage="Catatan" isLogin={isLogin} /> 
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            <main className="pt-20 flex lg:pt-28 flex-col items-center justify-center gap-5 lg:gap-10 font-montserratRegular">
                <div className="w-[80%] gap-3 flex flex-col">
                    <Link to="/notes" className="text-blue-500 text-xs lg:text-sm ">&lt;&lt; <span className="hover:underline">Kembali ke Daftar</span></Link>
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
                            {isLogin ? (
                                <SquareButton type="button" colorCode="bg-primary" onclick={handlePaymentToken} >Unduh</SquareButton>
                            ) : (
                                <SquareButton type="link" colorCode="bg-primary" path='/login' >Unduh</SquareButton>
                            )}
                            <div className="bg-backgroundPrime w-full h-[35rem] lg:h-[65rem] relative small-shadow ">
                                {isBought ? (
                                    <canvas ref={refPdfCanvas} id="pdf-render" className="w-full h-full"></canvas>
                                ) : (
                                    <img src={import.meta.env.VITE_BASE_URL + 'preview/' + note.thumbnail_name} className="w-full h-full" alt="" />
                                )}
                                <div className="absolute flex bg-white py-3 small-shadow flex-col gap-2 lg:gap-3 items-center w-full bottom-0 text-sm lg:text-base">
                                    <p className="font-montserratSemiBold">Preview</p>
                                    <p className="text-xs lg:text-sm">{isLogin? 'Silahkan beli terlebih dahulu' : 'Login untuk mengunduh'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </main>
            <Modal ref={refModal} title="Pembayaran" decline="Batal" accept="Bayar sekarang" onsubmit={handlePayment}>
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