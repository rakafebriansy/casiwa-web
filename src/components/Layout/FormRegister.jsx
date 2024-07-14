import Signature from "../Fragments/Signature";
import TextBox from "../Fragments/TextBox";
import CheckBox from "../Elements/InputCheckBox";
import LongRoundedButton from "../Elements/LongRoundedButton";
import AuthAnchor from "../Elements/AuthAnchor";
import DropdownField from "../Fragments/DropdownField";

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
                <div className="flex flex-col gap-2 lg:grid lg:grid-cols-2 w-full lg:gap-8">
                    <div className="flex flex-col gap-2">
                        <TextBox name="first_name">Nama Depan</TextBox>
                        <DropdownField name="university" label="Universitas">Pilih universitas</DropdownField>
                        <TextBox name="starting_year">Tahun Masuk Perkuliahan</TextBox>
                        <TextBox name="password">Kata Sandi</TextBox>
                    </div>
                    <div className="flex flex-col gap-2">
                        <TextBox name="last_name">Nama Belakang</TextBox>
                        <DropdownField name="study_program" label="Program Studi">Pilih Program Studi</DropdownField>
                        <TextBox name="email">Alamat Email</TextBox>
                        <TextBox name="confirm_password">Konfirmasi Kata Sandi</TextBox>
                    </div>
                </div>
                <LongRoundedButton>DAFTAR</LongRoundedButton>
            </div>
            <div className="w-full flex justify-center">
                <AuthAnchor hasAnAccount={false} classname="text-center"/>
            </div>
        </div>
        </>
    );
}

export default FormRegister;