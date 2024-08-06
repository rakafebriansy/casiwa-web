import { useContext } from "react";
import authBackgroundImage from "../assets/images/auth-background.png"
import { ShowAlertContext } from "../contexts/ShowAlert";
import Alert from "../components/Elements/Alert";
import { getScreenSize } from "../functions/main";
import Navbar from "../components/Layout/Navbar";
import TextBox from "../components/Fragments/TextBox";
import Signature from "../components/Fragments/Signature";
import LongRoundedButton from "../components/Elements/LongRoundedButton";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../services/auth.login";

const ForgotPasswordPage = () => {
    const {isShowAlert, setIsShowAlert} = useContext(ShowAlertContext);

    const handleForgot = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        forgotPassword(formData,
            (data) => {
            setIsShowAlert({status: true, message:data.message});
        }, err => {
            setIsShowAlert({status: true, message:err.message});
        });
    }
    
    return (
        <div>
            <img src={authBackgroundImage} alt="" className="hidden absolute h-screen w-screen z-[-1] lg:block"/>
            <section className="min-h-screen w-full flex justify-center items-center">
            {getScreenSize().width >= 640 && (<Navbar />)}
                {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
                <div className="w-[70%] h-[70%] flex flex-col items-center justify-between md:w-[28rem] md:border md:py-8 md:px-12 md:items-start md:rounded-xl md:shadow-lg bg-white">
                    <div className="flex flex-col items-center justify-between gap-2 md:items-start">
                        <Signature isAuth={true} classname="lg:hidden"/>
                        <h1 className="font-montserratBold text-secondary text-3xl mt-4">LUPA SANDI</h1>
                        <p className="">Kata sandi baru akan dikirimkan ke email anda. Segera masuk dan ganti kata sandi anda!</p>
                    </div>
                    <form onSubmit={handleForgot} className="w-full flex flex-col items-start gap-3 my-4">
                        <TextBox name="email">Email</TextBox>
                        <LongRoundedButton colorCode="bg-primary mt-2">RESET</LongRoundedButton>
                    </form>
                    <div className="w-full flex justify-center">
                        <Link to="/login" className="text-blue-500 font-montserratSemiBold hover:underline">Kembali ke Masuk</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ForgotPasswordPage;