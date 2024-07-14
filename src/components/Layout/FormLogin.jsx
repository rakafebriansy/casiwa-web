import Signature from "../Fragments/Signature";
import TextBox from "../Fragments/TextBox";
import CheckBox from "../Elements/CheckBox";
import LongRoundedButton from "../Elements/LongRoundedButton";
import AuthAnchor from "../Elements/AuthAnchor";

const FormLogin = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-[70%] h-[70%] flex flex-col items-center justify-between">
                <div className="flex flex-col items-center justify-between gap-2">
                    <Signature isAuth={true}/>
                    <h1 className="font-montserratBold text-secondary text-3xl mt-4">MASUK</h1>
                    <p className="text-center">Selamat datang, silahkan masuk</p>
                </div>
                <div className="w-full flex flex-col items-start gap-3 my-10">
                    <TextBox name="email">Email</TextBox>
                    <TextBox name="password">Kata Sandi</TextBox>
                    <div className="flex gap-4 items-center">
                        <CheckBox/>
                        <p>Ingat Saya</p>
                    </div>
                    <LongRoundedButton>MASUK</LongRoundedButton>
                </div>
                <AuthAnchor/>
            </div>
        </div>
    );
}

export default FormLogin;