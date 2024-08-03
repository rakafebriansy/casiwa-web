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
import { deleteNote, getSelectedNote, getUploadedNotes } from "../../services/util.notes.jsx";
import { LoadingIcon } from '../functions/svgs';
import FileBox from "../components/Fragments/FileBox";
import TextareaBox from "../components/Fragments/TextareaBox";
import TextBox from "../components/Fragments/TextBox";
import { getDocument, GlobalWorkerOptions } from '../../modules/pdf.js/build/pdf.mjs';
import { editNote, upload } from "../../services/util.notes.jsx";
import FormModal from "../components/Layout/FormModal.jsx";
import Modal from "../components/Elements/Modal.jsx";

GlobalWorkerOptions.workerSrc = '../../modules/pdf.js/build/pdf.worker.mjs';

const UploadedPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();
    const {isShowAlert} = useContext(ShowAlertContext);
    const [notes, setNotes] = useState({});
    const [selectedNote, setSelectedNote] = useState({});
    const refUploadModal = useRef(null);
    const refEditModal = useRef(null);
    const refDeleteModal = useRef(null);
    const {setIsShowAlert} = useContext(ShowAlertContext);

    const handleSearch = async (e) => {
        e.preventDefault();
        const userData = getCookie('user');
        getUploadedNotes((data) => {
            setNotes(data);
        },userData.token,e.target.keyword.value);
    }

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
                    refUploadModal.current.classList.replace('flex', 'hidden');
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
                    refUploadModal.current.classList.replace('flex', 'hidden');
                    form.reset();
                });
        }  else {
            refUploadModal.current.classList.replace('flex', 'hidden');
            setIsShowAlert({status: true, message:'File harus memiliki ekstensi pdf'});
        } 
    }
    const openEditModal = (e, id) => {
        e.preventDefault();
        const userData = getCookie('user');
        getSelectedNote(userData.token, id, (data) =>{
            setSelectedNote(data);
        });
        refEditModal.current.classList.replace('hidden', 'flex');
    }

    const handleEdit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData();
        formData.append('id', form.id.value);
        formData.append('title', form.title.value);
        formData.append('description', form.description.value);
        
        if(form.file.files[0]) {
            const file = form.file.files[0];
            if(file.type === 'application/pdf') {
                formData.append('file', file);
                const blob = await generateThumbnail(file);
                formData.append('thumbnail',blob,'thumbnail.png');
            } else {
                refUploadModal.current.classList.replace('flex', 'hidden');
                setIsShowAlert({status: true, message:'File harus memiliki ekstensi pdf'});
            }
        } 
        const userData = getCookie('user');
        editNote(formData, userData.token, (data) => {
            setNotes(data);
            form.reset();
            refEditModal.current.classList.replace('flex', 'hidden');
            setIsShowAlert({status: true, message:'Catatan berhasil diubah'});
        }, err => {
            setIsShowAlert({status: true, message:err.message});
            form.reset();
            refEditModal.current.classList.replace('flex', 'hidden');
        });
    }

    const openDeleteModal = (e, id, index) => {
        e.preventDefault();
        refDeleteModal.current.querySelector('input[name="id"]').value = id;
        refDeleteModal.current.classList.replace('hidden', 'flex');
        setSelectedNote({index})
    }

    const handleDelete = (e) => {
        e.preventDefault();

        const userData = getCookie('user');
        const formData = new FormData(e.target);
        deleteNote(formData, userData.token, (data) => {
            let new_notes = notes.data.filter((_, index) => index !== selectedNote.index);
            setNotes({data:new_notes, total:notes.total-1});
            refDeleteModal.current.classList.replace('flex', 'hidden');
            setIsShowAlert({status: true, message:data.message});
        }, err => {
            setIsShowAlert({status: true, message:err.message});
            refDeleteModal.current.classList.replace('flex', 'hidden');
        });
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
                            refUploadModal.current.classList.replace('hidden', 'flex');
                        }} colorCode="bg-primary">Unggah</SquareButton>
                    </div>
                    <div className="w-full text-xs">
                    {notes.total ?? 0} hasil
                    </div>
                </form>
            </div>
            <div className="lg:w-[80%] mb-5">
                {notes.data && notes.data.length > 0 ? (
                    <ul className="flex flex-col gap-5">
                    {notes.data.map((item, index) => {
                        return (
                            <NoteList isUpload={true} onEdit={(e) => {openEditModal(e, item.id)}} onDelete={(e) => {openDeleteModal(e, item.id, index)}} item={item} index={index}/>
                        );
                    })}
                    </ul>
                ) : (
                    <div className="flex justify-center items-center text-primary text-xl">
                        <h3>Tidak ada hasil</h3>
                    </div>
                )}
            </div>
            <Footer />
            <FormModal handler={handleUpload} ref={refUploadModal} btnText="Unggah" title="Unggah Catatan">
                <TextBox name="title">Judul</TextBox>
                <TextareaBox max={200} name="description" placeholder="Masukkan deskripsi catatan anda...">Deskripsi</TextareaBox>
                <FileBox dropzone={true} id="upload-doc" name="file">Dokumen</FileBox>
            </FormModal>
            <FormModal handler={handleEdit} ref={refEditModal} btnText="Ubah" title="Ubah Catatan">
                {selectedNote.id && (
                    <>
                    <input type="hidden" name="id" value={selectedNote.id} />
                    <TextBox value={selectedNote.title} name="title">Judul</TextBox>
                    <TextareaBox value={selectedNote.description} max={200} name="description" placeholder="Masukkan deskripsi catatan anda...">Deskripsi</TextareaBox>
                    <FileBox dropzone={true} id="edit-doc" name="file">Dokumen</FileBox>
                    </>
                )}
            </FormModal>
            <Modal onsubmit={handleDelete} ref={refDeleteModal} title="Hapus Catatan" danger={true} accept="Hapus">
                <input type="hidden" name="id"/>
                <p className="font-montserratRegular">Apakah anda yakin menghapus catatan ini?</p>
            </Modal>
        </section>
    );
};

export default UploadedPage;