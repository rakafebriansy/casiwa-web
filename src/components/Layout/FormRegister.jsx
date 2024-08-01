import Signature from "../Fragments/Signature";
import TextBox from "../Fragments/TextBox";
import LongRoundedButton from "../Elements/LongRoundedButton";
import AuthAnchor from "../Elements/AuthAnchor";
import DropdownField from "../Fragments/DropdownField";
import { useContext, useRef } from "react";
import { ShowAlertContext } from "../../contexts/ShowAlert";
import { register } from "../../../services/auth.register.jsx";
import { useNavigate } from "react-router-dom";

const FormRegister = (props) => {
    const {universities, studyPrograms} = props;
    const {setIsShowAlert} = useContext(ShowAlertContext);
    const navigate = useNavigate();
    
    const handleRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        register(formData,(data) => {
            if(data.success) {
                setIsShowAlert({status: true, message:data.message});
                navigate('/login');
            } else {
                setIsShowAlert({status: true, message:data.message});
            }
        });
    };

    return (
        <>
        <div className="w-[70%] h-[70%] flex flex-col items-center justify-between md:w-[50rem] md:border md:py-8 md:px-12 md:items-start md:rounded-xl md:shadow-lg bg-white">
            <div className="flex flex-col items-center justify-between gap-2 md:items-start">
                <Signature isAuth={true} classname="lg:hidden"/>
                <h1 className="font-montserratBold text-secondary text-3xl mt-4">DAFTAR</h1>
                <p className="text-center">Selamat datang, silahkan masukkan data diri anda!</p>
            </div>
            <form onSubmit={handleRegister} className="w-full flex flex-col items-start gap-8 my-6">
                <div className="flex flex-col gap-2 lg:grid lg:grid-rows-4 w-full lg:gap-2">
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <TextBox name="first_name">Nama Depan</TextBox>
                        <TextBox name="last_name">Nama Belakang</TextBox>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <DropdownField list={universities} name="university_id" label="Universitas">Pilih universitas</DropdownField>
                        <DropdownField list={studyPrograms} name="study_program_id" label="Program Studi">Pilih Program Studi</DropdownField>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <TextBox name="starting_year">Tahun Masuk Perkuliahan</TextBox>
                        <TextBox name="email">Alamat Email</TextBox>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <TextBox name="password" type="password">Kata Sandi</TextBox>
                        <TextBox name="confirm_password" type="password">Konfirmasi Kata Sandi</TextBox>
                    </div>
                </div>
                <LongRoundedButton>DAFTAR</LongRoundedButton>
            </form>
            <div className="w-full flex justify-center">
                <AuthAnchor hasAnAccount={false} classname="text-center"/>
            </div>
        </div>
        </>
    );
}

export default FormRegister;