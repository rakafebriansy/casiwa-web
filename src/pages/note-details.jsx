import Navbar from "../components/Layout/Navbar";
import { Link } from "react-router-dom";
import SquareButton from "../components/Elements/SquareButton";
import Footer from "../components/Layout/Footer";
import { hasDocumentUser } from "../../services/auth.authenticatedUser.mjs";
import { AnchorListContext } from "../contexts/AnchorList";
import { useContext, useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { getCookie, parseDate } from "../functions/main";
import { useParams } from 'react-router-dom';
import { getSingleNote, getSingleNotePreview } from "../../services/list.notes.mjs";
import { baseURL } from "../../services/env.mjs";
GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';

const NoteDetailsPage = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [note, setNote] = useState({});
    const {anchorList} = useContext(AnchorListContext);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [pageIsRendering, setPageIsRendering] = useState(1);
    const [pageNumIsPending, setPageNumIsPending] = useState(1);
    const refPdfCanvas = useRef(null);
    const {id} = useParams();

    const renderPage = (num, ctx, scale) => {
        if (!pdfDoc || !refPdfCanvas.current || !ctx) {
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
    
                if(pageNumIsPending !== null) {
                    renderPage(pageNumIsPending);
                    setPageNumIsPending(null); 
                }
            });
    
        });
    };
    
    const queueRenderPage = num => {
        if(pageIsRendering) {
            setPageNumIsPending(num);
        } else {
            renderPage(num);
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

    useEffect(()=> {
        const userData = getCookie('user');
        if(userData) {
            hasDocumentUser(userData.token, id,res => 
                {
                if(res.data.success) {
                    setIsLogin(res.data.data.login);
                    if(res.data.data.bought) {
                        const userData = getCookie('user');
                        getSingleNote(id, userData.token, data => {
                            setNote(data);
                        });
                    } else {
                        getSingleNotePreview(id, (data) => {
                            setNote(data);
                        });
                    }
                }
            }, 
            err => {
                console.log('Unauthenticated');
                getSingleNotePreview(id, (data) => {
                    setNote(data);
                });
            }, 
            () => {
                setIsLoading(false);
            });
        }
    },[]);

    useEffect(() => {
        if(note.file_name) {
            getDocument(baseURL + 'document/' + note.file_name).promise.then(pdfDoc_ => {
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
        if (pdfDoc && refPdfCanvas.current) {
            const ctx = refPdfCanvas.current.getContext('2d');
            if (ctx) {
                renderPage(pageNum, ctx, 1.5);
            }
        }
    }, [pdfDoc, pageNum]);

    if (isLoading) return (<h1>Loading...</h1>);

    return (
        <>
        <Navbar anchors={anchorList} isLogin={isLogin} /> 
        {note.title && (
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
                            <SquareButton colorCode="bg-primary">Unduh</SquareButton>
                            <div className="bg-backgroundPrime w-full h-[35rem] lg:h-[65rem] relative small-shadow ">
                                {note.file_name ? (
                                    <canvas ref={refPdfCanvas} id="pdf-render" className="w-full h-full"></canvas>
                                ) : (
                                    <img src={baseURL + 'preview/' + note.thumbnail_name} className="w-full h-full" alt="" />
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
        )}
        </>
    );
};

export default NoteDetailsPage;