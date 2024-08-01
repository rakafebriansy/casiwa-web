import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingIcon, PencilIcon, ProfileIcon } from "../functions/svgs";
import TextBox from "../components/Fragments/TextBox";
import { ShowAlertContext } from "../contexts/ShowAlert";
import { deleteCookie, getCookie } from "../functions/main";
import SquareButton from "../components/Elements/SquareButton";
import Alert from "../components/Elements/Alert";
import { authenticatedAdmin } from "../../services/auth.authenticatedUser";
import { editAdminPassword } from "../../services/auth.profile";

const AdminProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {isShowAlert, setIsShowAlert} = useContext(ShowAlertContext);
    const {anchorList} = useContext(AnchorListContext);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const refForm = useRef(null);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const userData = getCookie('admin');
        if(userData) {
            const formData = new FormData(refForm.current);
            editAdminPassword(formData, userData.token, (data) => {
                if(data.success) {
                    setIsShowAlert({status: true, message:data.message});
                } else {
                    setIsShowAlert({status: true, message:data.message});
                }
            })
        }
    }

    const handleLogout = () =>{
        deleteCookie('admin');
        navigate('/');
    }

    useEffect(()=> {
        const userData = getCookie('admin')
        if(userData) {
            authenticatedAdmin(userData.token,
                res => {
                    setIsLogin(res.data.success);
                }, 
                err => {
                    console.log('Unauthenticated');
                    navigate('/login');
            },
            () => {
                setIsLoading(false);
            });
        } else {
            navigate('/login');
        }
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );

    return (
        <>
        {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
        <Navbar anchors={anchorList[1]} isAdmin={isLogin} isThisPage="Profile" isLogin={true}/>
        <form ref={refForm} onSubmit={handleSubmit} className="pt-20 flex flex-col items-center gap-6 mb-10">
            <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-[#F0F2F9] w-24 h-24 relative  flex justify-center items-center">
                    <ProfileIcon classname="w-[40%]"/>
                </div>
            </div>
            <div className="flex flex-col gap-2 lg:grid lg:grid-rows-4 lg:gap-2 w-[80%]">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                    <TextBox placeholder="isi untuk mengubah" colored={true} name="password" type="password">Kata Sandi</TextBox>
                    <TextBox placeholder="isi untuk mengubah" colored={true} name="confirm_password" type="password">Konfirmasi Kata Sandi</TextBox>
                </div>
                <div className="flex justify-between mt-4">
                    <SquareButton type="submit" colorCode="bg-primary">Ubah</SquareButton>
                    <SquareButton type="button" onclick={handleLogout} colorCode="bg-red-500">Logout</SquareButton>
                </div>
            </div>
        </form>
        <Footer />
        </>
    );
}

export default AdminProfilePage;