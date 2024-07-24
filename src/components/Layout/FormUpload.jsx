import FileBox from "../Fragments/FileBox";
import TextareaBox from "../Fragments/TextareaBox";
import TextBox from "../Fragments/TextBox";
import LongRoundedButton from "../Elements/LongRoundedButton"
import CloseButton from "../Elements/CloseButton";
import React, { useContext } from "react";
import { getDocument, GlobalWorkerOptions } from '../../../modules/pdf.js/build/pdf.mjs';
import { upload } from "../../../services/auth.upload.mjs";
import { ShowAlertContext } from "../../contexts/ShowAlert";
GlobalWorkerOptions.workerSrc = '../../../modules/pdf.js/build/pdf.worker.mjs';

const FormUpload = React.forwardRef((props, ref) => {

    // const [file, setFile] = useState(null);
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
                                    // setThumbnail(blob);
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
            try {
                const userData = JSON.parse(localStorage.getItem('user'));
                const blob = await generateThumbnail(file);
                formData.append('thumbnail',blob,'thumbnail.png');
                upload(formData, userData.token, (data) => {
                    console.log(data);
                    ref.current.classList.replace('flex', 'hidden');
                    if(data.success) {
                        setIsShowAlert({status: true, message:data.message});
                    } else {
                        setIsShowAlert({status: true, message:data.message});
                    }
                });
            } catch (error) {
                console.log(error);
                ref.current.classList.replace('flex', 'hidden');
                setIsShowAlert({status: true, message:'Dokumen gagal diunggah'});
            }
        }  else {
            ref.current.classList.replace('flex', 'hidden');
            setIsShowAlert({status: true, message:'File harus memiliki ekstensi pdf'});
        } 
    }

    return (
        <form ref={ref} encType="multipart/form-data" onSubmit={handleUpload} className="hidden items-center w-full h-screen justify-center top-0 left-0 fixed z-30">
            <div className="w-full h-full bg-black opacity-10 absolute top-0 left-0"></div>
            <div className="p-7 rounded-2xl w-[40%] bg-white flex flex-col gap-5 z-10">
                <div className="flex justify-between items-center py-3 border-b">
                    <h3 className="font-montserratBold text-lg">
                    Unggah Catatan 
                    </h3>
                    <CloseButton onclick={() => {
                        ref.current.classList.replace('flex','hidden');
                    }}/>
                </div>
                <div className="flex flex-col gap-3">
                    <TextBox name="title">Judul</TextBox>
                    <TextareaBox max={200} name="description" placeholder="Masukkan deskripsi catatan anda...">Deskripsi</TextareaBox>
                    <FileBox name="file">Dokumen</FileBox>
                </div>
                <LongRoundedButton>Unggah</LongRoundedButton>
            </div>
        </form>
    );
});

export default FormUpload;