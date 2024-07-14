import Signature from "../Fragments/Signature";
import TextBox from "../Fragments/TextBox";
import CheckBox from "../Elements/CheckBox";
import LongRoundedButton from "../Elements/LongRoundedButton";
import AuthAnchor from "../Elements/AuthAnchor";

const FormLogin = () => {
    return (
        <>
        <div className="w-[70%] h-[70%] flex flex-col items-center justify-between md:w-[28rem] md:border md:py-8 md:px-12 md:items-start md:rounded-xl md:shadow-lg bg-white">
            <div className="flex flex-col items-center justify-between gap-2 md:items-start">
                <Signature isAuth={true} classname="lg:hidden"/>
                <h1 className="font-montserratBold text-secondary text-3xl mt-4">MASUK</h1>
                <p className="text-center">Selamat datang, silahkan masuk</p>
            </div>
            <div className="w-full flex flex-col items-start gap-3 my-10">
                <TextBox name="email">Email</TextBox>
                <TextBox name="password">Kata Sandi</TextBox>
                <div className="flex gap-4 items-center">
                    <CheckBox name="rememberme" id="checkbox-rememberme"/>
                    <label htmlFor="checkbox-rememberme" className="cursor-pointer select-none">Ingat Saya</label>
                </div>
                <LongRoundedButton>MASUK</LongRoundedButton>
            </div>
            <div className="w-full flex justify-center">
                <AuthAnchor/>
            </div>
        </div>
        </>
    );
}

export default FormLogin;