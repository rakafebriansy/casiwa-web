import Navbar from "../components/Layout/Navbar";
import { getScreenSize } from "../functions/main";
import authBackgroundImage from "../assets/images/auth-background.png"
import Logo from "../components/Elements/Logo";
import FormRegister from "../components/Layout/FormRegister";
import { useContext, useEffect, useState } from "react";
import { getAllUserDetails } from "../../services/util.userDetail.jsx";
import Alert from "../components/Elements/Alert";
import { ShowAlertContext } from "../contexts/ShowAlert";

const RegisterPage = () => {

    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const {isShowAlert} = useContext(ShowAlertContext);

    useEffect(()=> {
        getAllUserDetails('universities',(data) => {
            setUniversities(data.data);
        });
        getAllUserDetails('study-programs',(data) => {
            setStudyPrograms(data.data);
        });
    },[]);
    
    return (
        <main>
            <img src={authBackgroundImage} alt="" className="hidden absolute h-screen w-screen z-[-1] lg:block"/>
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            {universities.length > 0 && studyPrograms.length > 0 && (
            <>
                {getScreenSize().width >= 640 && (<Navbar />)}
                <div className="flex justify-around mt-[5rem] md:mt-0 lg:items-center min-h-screen">
                    <FormRegister universities={universities} studyPrograms={studyPrograms} />
                    <div className="hidden lg:flex justify-center flex-col items-center">
                        <Logo classname="w-56"/>
                        <h1 className="text-3xl text-primary font-montserratBold">Welcome to Casiwa</h1>
                    </div>
                </div>
            </>
            )}
        </main>
    );
};

export default RegisterPage;