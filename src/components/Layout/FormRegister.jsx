import Signature from "../Fragments/Signature";
import TextBox from "../Fragments/TextBox";
import CheckBox from "../Elements/CheckBox";
import LongRoundedButton from "../Elements/LongRoundedButton";
import AuthAnchor from "../Elements/AuthAnchor";

const FormRegister = () => {
    return (
        <>
        <div className="w-[70%] h-[70%] flex flex-col items-center justify-between md:w-[50rem] md:border md:py-8 md:px-12 md:items-start md:rounded-xl md:shadow-lg bg-white">
            <div className="flex flex-col items-center justify-between gap-2 md:items-start">
                <Signature isAuth={true} classname="lg:hidden"/>
                <h1 className="font-montserratBold text-secondary text-3xl mt-4">DAFTAR</h1>
                <p className="text-center">Selamat datang, silahkan masukkan data diri anda!</p>
            </div>
            <div className="w-full flex flex-col items-start gap-8 my-6">
                <div className="grid grid-cols-2 w-full gap-8">
                    <div className="flex flex-col gap-2">
                        <TextBox name="first_name">Nama Depan</TextBox>
                        <TextBox name="university">Universitas</TextBox>
                        <TextBox name="starting_year">Tahun Masuk Perkuliahan</TextBox>
                        <TextBox name="password">Kata Sandi</TextBox>
                    </div>
                    <div className="flex flex-col gap-2">
                        <TextBox name="last_name">Nama Belakang</TextBox>
                        <TextBox name="study_program">Kata Sandi</TextBox>
                        <TextBox name="email">Alamat Email</TextBox>
                        <TextBox name="confirm_password">Konfirmasi Kata Sandi</TextBox>
                    </div>
                </div>
                <LongRoundedButton>DAFTAR</LongRoundedButton>
            </div>
            <div className="w-full flex justify-center">
                <AuthAnchor hasAnAccount={false}/>
            </div>
        </div>
        </>
    );
}

export default FormRegister;