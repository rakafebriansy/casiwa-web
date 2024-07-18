import FormLogin from "../components/Layout/FormLogin";
import Navbar from "../components/Layout/Navbar";
import { getScreenSize } from "../functions/layout";
import { getAnchorList } from "../functions/static";
import authBackgroundImage from "../assets/images/auth-background.png"
import Logo from "../components/Elements/Logo";
import { AfterRegisterContext } from "../contexts/AfterRegister";
import { useContext } from "react";
import Alert from "../components/Elements/Alert";

const LoginPage = () => {
    const {isAfterRegister} = useContext(AfterRegisterContext);
    return (
        <>
            <img src={authBackgroundImage} alt="" className="hidden absolute h-screen w-screen z-[-1] lg:block"/>
            {getScreenSize().width >= 640 && (<Navbar anchors={getAnchorList()} />)}
            {isAfterRegister.status && (<Alert>{isAfterRegister.message}</Alert>)}
            <div className="flex justify-around mt-[5rem] md:mt-0 lg:items-center min-h-screen">
                <FormLogin/>
                <div className="hidden lg:flex justify-center flex-col items-center">
                    <Logo/>
                    <h1 className="text-4xl text-primary font-montserratBold">Welcome to Casiwa</h1>
                </div>
            </div>
        </>
    );
};

export default LoginPage;