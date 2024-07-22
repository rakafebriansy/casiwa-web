import FileBox from "../Fragments/FileBox";
import TextareaBox from "../Fragments/TextareaBox";
import TextBox from "../Fragments/TextBox";
import LongRoundedButton from "../Elements/LongRoundedButton"
import CloseButton from "../Elements/CloseButton";

const FormUpload = () => {
    return (
        <div className="flex items-center min-h-screen bg-backgroundPrime justify-center">
            <div className="w-[40%] h-[40%] p-7 rounded-2xl bg-white flex flex-col gap-5">
                <div className="flex justify-between items-center py-3 border-b">
                    <h3 className="font-montserratBold text-lg">
                    Unggah Catatan
                    </h3>
                    <CloseButton/>
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
};

export default FormUpload;