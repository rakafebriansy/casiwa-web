import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { useContext, useEffect, useRef, useState } from "react";
import { IdCardIcon, LoadingIcon, PencilIcon, ProfileIcon } from "../functions/svgs";
import TextBox from "../components/Fragments/TextBox";
import DropdownField from "../components/Fragments/DropdownField";
import { ShowAlertContext } from "../contexts/ShowAlert";
import { getAllUserDetails } from "../../services/util.userDetail";
import { deleteCookie, getCookie } from "../functions/main";
import { authenticatedProfile } from "../../services/auth.authenticatedUser";
import FileBox from "../components/Fragments/FileBox";
import SquareButton from "../components/Elements/SquareButton";
import { editProfile } from "../../services/auth.profile";
import Alert from "../components/Elements/Alert";
import Modal from "../components/Elements/Modal";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {isShowAlert, setIsShowAlert} = useContext(ShowAlertContext);
    const {anchorList} = useContext(AnchorListContext);
    const [profile, setProfile] = useState({});
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [banks, setBanks] = useState([]);
    const navigate = useNavigate();
    const refForm = useRef(null);
    const refModal = useRef(null);

    const handleSubmit = (e) =>{
        e.preventDefault();

        const userData = getCookie('user');
        if(userData) {
            const formData = new FormData(refForm.current);
            editProfile(formData, userData.token, (data) => {
                if(data.success) {
                    setIsShowAlert({status: true, message:data.message});
                } else {
                    setIsShowAlert({status: true, message:data.message});
                }
            })
        }
    }

    const handleLogout = () =>{
        deleteCookie('user');
        navigate('/');
    }
    useEffect(()=> {
        const userData = getCookie('user')
        if(userData) {
            authenticatedProfile(userData.token,
                res => {
                setProfile(res.data.data);
            }, 
            err => {
                console.log(err);
                navigate('/login');
            },
            () => {
                setIsLoading(false);
            });

            getAllUserDetails('universities',(data) => {
                setUniversities(data.data);
            });
            getAllUserDetails('study-programs',(data) => {
                setStudyPrograms(data.data);
            });
            getAllUserDetails('banks',(data) => {
                setBanks(data.data);
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
        <Navbar anchors={anchorList[0]} isThisPage="Profile" isLogin={true}/>
        <form encType="multipart/form-data" ref={refForm} onSubmit={handleSubmit} className="pt-20 flex flex-col items-center gap-6 mb-10">
            <div className="flex flex-col items-center gap-3">
                <div className="rounded-full bg-[#F0F2F9] w-24 h-24 relative  flex justify-center items-center">
                    <ProfileIcon classname="w-[40%]"/>
                    {/* <div className="w-8 h-8 bg-secondary flex justify-center items-center rounded-full absolute right-0 bottom-0 translate-x-[5%] translate-y-[5%]">
                        <PencilIcon classname="w-[40%]"/>
                    </div> */}
                </div>
                {(!profile.ktp_image || !profile.bank || !profile.account_number) && (
                    <p className="text-red-500 font-montserratBold">Lengkapi Profil Anda!</p>
                )}
            </div>
            <div className="flex flex-col gap-2 lg:grid lg:grid-rows-4 lg:gap-2 w-[80%]">
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                    <TextBox value={profile.first_name} colored={true} name="first_name">Nama Depan</TextBox>
                    <TextBox value={profile.last_name} colored={true} name="last_name">Nama Belakang</TextBox>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                    <DropdownField value={profile.university} colored={true} list={universities} name="university_id" label="Universitas">Pilih universitas</DropdownField>
                    <DropdownField value={profile.study_program} colored={true} list={studyPrograms} name="study_program_id" label="Program Studi">Pilih Program Studi</DropdownField>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                    <TextBox value={profile.starting_year} colored={true} name="starting_year">Tahun Masuk Perkuliahan</TextBox>
                    <TextBox value={profile.email} colored={true} name="email">Alamat Email</TextBox>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                    <TextBox placeholder="isi untuk mengubah" colored={true} name="password" type="password">Kata Sandi</TextBox>
                    <TextBox placeholder="isi untuk mengubah" colored={true} name="confirm_password" type="password">Konfirmasi Kata Sandi</TextBox>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                    <DropdownField value={profile.bank ?? undefined} colored={true} list={banks} name="bank_id" label="Bank">Pilih Bank</DropdownField>
                    <TextBox value={profile.account_number} colored={true} name="account_number" type="text">Nomor Rekening</TextBox>
                </div>
                <div className="flex justify-between items-center gap-3">
                    <FileBox message="PNG atau JPG (MAX. 1MB)." name="ktp_image">Foto KTP</FileBox>
                    {profile.ktp_image && (
                        <div className="p-1 flex justify-end cursor-pointer" onClick={() => {refModal.current.classList.replace('hidden','flex')}}>
                            <IdCardIcon classname="w-10 border rounded-lg small-shadow"/>
                        </div>
                    )}
                </div>
                <div className="flex justify-between mt-4">
                    <SquareButton type="submit" colorCode="bg-primary">Ubah</SquareButton>
                    <SquareButton type="button" onclick={handleLogout} colorCode="bg-red-500">Logout</SquareButton>
                </div>
            </div>
        </form>
        <Footer />
        {profile.ktp_image && (
            <Modal ref={refModal} title={'Foto KTP ' + profile.first_name + ' ' + profile.last_name}>
                <img src={import.meta.env.VITE_BASE_URL + 'ktp/' + profile.ktp_image} alt="" />
            </Modal>
        )}
        </>
    );
}

export default ProfilePage;