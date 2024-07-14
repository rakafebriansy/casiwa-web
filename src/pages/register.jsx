import FormLogin from "../components/Layout/FormLogin";
import Navbar from "../components/Layout/Navbar";
import { getScreenSize } from "../functions/layout";
import { getAnchorList } from "../functions/static";
import authBackground from "../assets/images/auth-background.png"
import Logo from "../components/Elements/Logo";
import FormRegister from "../components/Layout/FormRegister";

const RegisterPage = () => {
    return (
        <>
            <img src={authBackground} alt="" className="hidden absolute h-screen w-screen z-[-1] lg:block"/>
            {getScreenSize().width >= 640 && (<Navbar anchors={getAnchorList()} />)}
            <div className="flex justify-around mt-[5rem] md:mt-0 lg:items-center min-h-screen">
                <FormRegister/>
                <div className="hidden lg:flex justify-center flex-col items-center">
                    <Logo classname="w-44"/>
                    <h1 className="text-2xl text-primary font-montserratBold">Welcome to Casiwa</h1>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;