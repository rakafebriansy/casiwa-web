import FormLogin from "../components/Layout/FormLogin";
import Navbar from "../components/Layout/Navbar";
import { getScreenSize } from "../functions/main";
import authBackgroundImage from "../assets/images/auth-background.png"
import Logo from "../components/Elements/Logo";
import { useContext } from "react";
import Alert from "../components/Elements/Alert";
import { ShowAlertContext } from "../contexts/ShowAlert";

const LoginPage = () => {
    const {isShowAlert} = useContext(ShowAlertContext);
    return (
        <main>
            <img src={authBackgroundImage} alt="" className="hidden absolute h-screen w-screen z-[-1] lg:block"/>
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            {getScreenSize().width >= 640 && (<Navbar />)}
            <div className="flex justify-around mt-[5rem] md:mt-0 lg:items-center min-h-screen">
                <FormLogin admin={false}/>
                <div className="hidden lg:flex justify-center flex-col items-center">
                    <Logo/>
                    <h1 className="text-4xl text-primary font-montserratBold">Welcome to Casiwa</h1>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;