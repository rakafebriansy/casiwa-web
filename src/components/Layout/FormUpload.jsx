import FileBox from "../Fragments/FileBox";
import TextareaBox from "../Fragments/TextareaBox";
import TextBox from "../Fragments/TextBox";
import LongRoundedButton from "../Elements/LongRoundedButton"
import CloseButton from "../Elements/CloseButton";
import React from "react";

const FormUpload = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className="hidden items-center w-full h-screen justify-center top-0 left-0 fixed z-30">
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
                    <TextareaBox name="description" placeholder="Masukkan deskripsi catatan anda...">Deskripsi</TextareaBox>
                    <FileBox name="file">Dokumen</FileBox>
                </div>
                <LongRoundedButton>Unggah</LongRoundedButton>
            </div>
        </div>
    );
});

export default FormUpload;