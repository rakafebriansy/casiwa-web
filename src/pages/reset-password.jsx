import { useContext, useEffect, useState } from "react";
import authBackgroundImage from "../assets/images/auth-background.png"
import { ShowAlertContext } from "../contexts/ShowAlert";
import Alert from "../components/Elements/Alert";
import { getScreenSize } from "../functions/main";
import Navbar from "../components/Layout/Navbar";
import TextBox from "../components/Fragments/TextBox";
import Signature from "../components/Fragments/Signature";
import LongRoundedButton from "../components/Elements/LongRoundedButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authenticatedResetToken } from "../../services/auth.authenticatedUser";
import { LoadingIcon } from "../functions/svgs";
import { resetPassword } from "../../services/auth.login";

const ResetPasswordPage = () => {
    const {isShowAlert, setIsShowAlert} = useContext(ShowAlertContext);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const [isLoading, setIsLoading] = useState(true);

    const handleReset = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('token',token);
        resetPassword(formData,
            (data) => {
            setIsShowAlert({status: true, message:data.message});
            setTimeout(() => {
                navigate('/login');
            }, 5);
        }, err => {
            setIsShowAlert({status: true, message:err.message});
        });
    }

    useEffect(() => {
        authenticatedResetToken(token,
            (data) => {
                console.log(data)
            if(!data.success) {
                navigate('/your-token-has-expired');
            }
        }, err => {
            console.log('err')
            navigate('/your-token-has-expired');
        }, () => {
            setIsLoading(false);
        });
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );
    
    return (
        <div>
            <img src={authBackgroundImage} alt="" className="hidden absolute h-screen w-screen z-[-1] lg:block"/>
            <section className="min-h-screen w-full flex justify-center items-center">
            {getScreenSize().width >= 640 && (<Navbar />)}
                {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
                <div className="w-[70%] h-[70%] flex flex-col items-center justify-between md:w-[28rem] md:border md:py-8 md:px-12 md:items-start md:rounded-xl md:shadow-lg bg-white">
                    <div className="flex flex-col items-center justify-between gap-2 md:items-start">
                        <Signature isAuth={true} classname="lg:hidden"/>
                        <h1 className="font-montserratBold text-secondary text-3xl mt-4">RESET SANDI</h1>
                        <p className="">Buatlah kata sandi baru anda!</p>
                    </div>
                    <form onSubmit={handleReset} className="w-full flex flex-col items-start gap-3 my-4">
                        <TextBox name="password" type="password">Kata Sandi Baru</TextBox>
                        <TextBox name="confirm_password" type="password">Konfimasi Kata Sandi Baru</TextBox>
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

export default ResetPasswordPage;