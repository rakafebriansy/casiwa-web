import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import SearchButton from "../components/Elements/SearchButton";
import Footer from "../components/Layout/Footer";
import NoteList from "../components/Layout/NoteList";
import { authenticatedUser } from "../../services/auth.authenticatedUser.jsx";
import { useNavigate } from "react-router-dom";
import { AnchorListContext } from "../contexts/AnchorList";
import SquareButton from "../components/Elements/SquareButton";
import { ShowAlertContext } from "../contexts/ShowAlert";
import Alert from "../components/Elements/Alert";
import { getCookie } from "../functions/main";
import { getUploadedNotes } from "../../services/util.notes.jsx";
import { LoadingIcon } from '../functions/svgs';
import FileBox from "../components/Fragments/FileBox";
import TextareaBox from "../components/Fragments/TextareaBox";
import TextBox from "../components/Fragments/TextBox";
import LongRoundedButton from "../components/Elements/LongRoundedButton"
import CloseButton from "../components/Elements/CloseButton";
import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { upload } from "../../services/util.upload.jsx";

GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';

const UploadedPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();
    const {isShowAlert} = useContext(ShowAlertContext);
    const [notes, setNotes] = useState({});
    const refUploadDropdown = useRef(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const userData = getCookie('user');
        getUploadedNotes((data) => {
            setNotes(data);
        },userData.token,e.target.keyword.value);
    }

    const {setIsShowAlert} = useContext(ShowAlertContext);

    const generateThumbnail = async (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function() {
                try {
                    const loadingTask = getDocument({data: new Uint8Array(this.result)});
                    loadingTask.promise.then(function(pdf) {
                        pdf.getPage(1).then(function(page) {
                            const scale = 1.5, canvas = document.createElement('canvas');
                            const viewport = page.getViewport({scale}), ctx = canvas.getContext('2d');
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
    
                            const renderContext = {
                                canvasContext: ctx,
                                viewport
                            };
    
                            page.render(renderContext).promise.then(function() {
                                canvas.toBlob(function(blob) {
                                    if(blob) resolve(blob);
                                    else reject(new Error('Failed to create blob'));
                                    }, 'image/png');
                                });
                            });
                        });
                    } catch (error) {
                        reject(error);
                    }
                };

                reader.readAsArrayBuffer(file);
            }
        );
    }

    const handleUpload = async (e) => {
        e.preventDefault();

        const form = e.target;
        const file = form.file.files[0];
        
        if(file && file.type === 'application/pdf') {
            const formData = new FormData();
            formData.append('title', form.title.value);
            formData.append('description', form.description.value);

            formData.append('file', file);
                const userData = getCookie('user');
                const blob = await generateThumbnail(file);
                formData.append('thumbnail',blob,'thumbnail.png');
                upload(formData, userData.token, (data) => {
                    refUploadDropdown.current.classList.replace('flex', 'hidden');
                    if(data.success) {
                        setNotes({
                            data: [data.data,...notes.data],
                            total: notes.total + 1
                        });
                        setIsShowAlert({status: true, message:data.message});
                    }
                    form.reset();
                }, err => {
                    setIsShowAlert({status: true, message:err.message});
                    refUploadDropdown.current.classList.replace('flex', 'hidden');
                    form.reset();
                });
        }  else {
            refUploadDropdown.current.classList.replace('flex', 'hidden');
            setIsShowAlert({status: true, message:'File harus memiliki ekstensi pdf'});
        } 
    }

    useEffect(()=> {
        const userData = getCookie('user')
        if(userData) {
            authenticatedUser(userData.token,
                res => {
                setIsLogin(res.data.success);
            }, 
            err => {
                console.log('Unauthenticated');
                navigate('/login');
            },
            () => {
                setIsLoading(false);
            });
        } else {
            navigate('/login');
        }
        getUploadedNotes((data) => {
            setNotes(data);
        },userData.token);
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );

    return (
        <section className="bg-backgroundPrime pt-20 min-h-screen lg:pt-28 font-montserratRegular flex flex-col items-center justify-between relative">
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            <Navbar anchors={anchorList[0]} isThisPage="Unggahan" isLogin={isLogin}/>
            <div className=" flex flex-col items-center w-[90%] lg:w-[80%]">
                <form onSubmit={handleSearch} className="w-[80%] lg:w-full mb-5">
                    <SearchButton name="keyword">Cari dokumen</SearchButton>
                    <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex w-full">
                        <SquareButton type="button" onclick={(e) => {
                            e.preventDefault();
                            refUploadDropdown.current.classList.replace('hidden', 'flex');
                        }} colorCode="border-primary hover:bg-primary text-primary">Unggah</SquareButton>
                    </div>
                    <div className="w-full text-xs">
                    {notes.total} hasil
                    </div>
                </form>
            </div>
            <div className="lg:w-[80%] mb-5">
                <NoteList notes={notes.data}/>
            </div>
            <Footer />
            <form ref={refUploadDropdown} encType="multipart/form-data" onSubmit={handleUpload} className="hidden items-center w-full h-screen justify-center top-0 left-0 fixed z-30">
            <div className="w-full h-full bg-black opacity-10 absolute top-0 left-0"></div>
            <div className="p-7 rounded-2xl w-[90%] lg:w-[40%] bg-white flex flex-col gap-5 z-10">
                <div className="flex justify-between items-center py-3 border-b">
                    <h3 className="font-montserratBold text-lg">
                    Unggah Catatan 
                    </h3>
                    <CloseButton onclick={() => {
                        refUploadDropdown.current.classList.replace('flex','hidden');
                    }}/>
                </div>
                <div className="flex flex-col gap-3">
                    <TextBox name="title">Judul</TextBox>
                    <TextareaBox max={200} name="description" placeholder="Masukkan deskripsi catatan anda...">Deskripsi</TextareaBox>
                    <FileBox dropzone={true} name="file">Dokumen</FileBox>
                </div>
                <LongRoundedButton>Unggah</LongRoundedButton>
            </div>
        </form>
        </section>
    );
};

export default UploadedPage;