import Navbar from "../components/Layout/Navbar";
import { useNavigate } from "react-router-dom";
import SquareButton from "../components/Elements/SquareButton";
import Footer from "../components/Layout/Footer";
import { authenticatedAdmin } from "../../services/auth.authenticatedUser.jsx";
import { AnchorListContext } from "../contexts/AnchorList";
import { useContext, useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { getCookie, parseDate } from "../functions/main";
import { useParams } from 'react-router-dom';
import { adminDeleteNote, getSingleNote } from "../../services/util.notes.jsx";
GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';
import Modal from "../components/Elements/Modal";
import { ShowAlertContext } from "../contexts/ShowAlert.jsx";
import { LeftArrowIcon, LoadingIcon, RightArrowIcon } from '../functions/svgs';
import Alert from "../components/Elements/Alert";

const AdminNoteDetailsPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [note, setNote] = useState({});
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [pageIsRendering, setPageIsRendering] = useState(false);
    const {anchorList} = useContext(AnchorListContext);
    const {isShowAlert, setIsShowAlert} = useContext(ShowAlertContext);
    const refPdfCanvas = useRef(null);
    const {idParams} = useParams();
    const navigate = useNavigate();
    const refDeleteModal = useRef();

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

    const openDeleteModal = (e) => {
        e.preventDefault();
        refDeleteModal.current.classList.replace('hidden', 'flex');
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const userData = getCookie('user');
        const formData = new FormData(e.target);
        adminDeleteNote(formData, userData.token, (data) => {
            refDeleteModal.current.classList.replace('flex', 'hidden');
            navigate('/admin/notes');
        }, err => {
            setIsShowAlert({status: true, message:err.message});
            refDeleteModal.current.classList.replace('flex', 'hidden');
        });
    }

    useEffect(()=> {
        const adminData = getCookie('admin');
        if(adminData) {
            authenticatedAdmin(adminData.token,
                res => {
                    setIsLogin(res.data.success);
                    getSingleNote(idParams, data => {
                        setNote(data);
                    });
                }, 
                err => {
                    console.log('Unauthenticated');
                    navigate('/login');
            }, 
            () => {
                setIsLoading(false);
            });
        }
    },[]);

    useEffect(() => {
        if(Object.keys(note).length > 0 && refPdfCanvas.current) {
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
    },[note, refPdfCanvas]);
 
    useEffect(() => {
        if(!pageIsRendering) {
            if (isLogin && pdfDoc && refPdfCanvas.current) {
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
            <Navbar anchors={anchorList[1]} isAdmin={true} isLogin={isLogin} /> 
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
                            <SquareButton type="button" onclick={openDeleteModal} colorCode="bg-red-500" >Hapus</SquareButton>
                            <div className="bg-backgroundPrime w-full h-[35rem] lg:h-[65rem] relative small-shadow ">
                                <canvas ref={refPdfCanvas} id="pdf-render" className="w-full h-full"></canvas>
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
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
                <Modal onsubmit={handleDelete} ref={refDeleteModal} title="Hapus Catatan" danger={true} accept="Hapus">
                    <input type="hidden" name="id" value={idParams}/>
                    <p className="font-montserratRegular">Apakah anda yakin menghapus catatan ini?</p>
                </Modal>
            </section>
            </>
        )}
        </>
    );
};

export default AdminNoteDetailsPage;