import { useNavigate } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { useContext, useEffect, useState } from "react";
import { PencilIcon, ProfileIcon } from "../functions/svgs";
import TextBox from "../components/Fragments/TextBox";
import DropdownField from "../components/Fragments/DropdownField";
import { ShowAlertContext } from "../contexts/ShowAlert";
import { getBanks, getStudyPrograms, getUniversities } from "../../services/util.userDetail";
import { getCookie } from "../functions/main";
import { authenticatedProfile } from "../../services/auth.authenticatedUser";
import FileBox from "../components/Fragments/FileBox";
import SquareButton from "../components/Elements/SquareButton";

const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState({});
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [banks, setBanks] = useState([]);
    const {isShowAlert} = useContext(ShowAlertContext);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();

    const handleSubmit = () =>{

    }

    const handleLogout = () =>{

    }

    useEffect(()=> {
        const userData = getCookie('user')
        if(userData) {
            authenticatedProfile(userData.token,
                res => {
                    console.log(res.data.data)
                setProfile(res.data.data);
            }, 
            err => {
                console.log('Unauthenticated');
                navigate('/login');
            },
            () => {
                setIsLoading(false);
            });

            getUniversities((data) => {
                setUniversities(data.data);
            });
            getStudyPrograms((data) => {
                setStudyPrograms(data.data);
            });
            getBanks((data) => {
                setBanks(data.data);
            });
        } else {
            navigate('/login');
        }
    },[]);

    return (
        <>
        <Navbar anchors={anchorList} isThisPage="Catatan" isLogin={true}/>
        <section className="pt-20 flex flex-col items-center gap-6 mb-10">
            <div className="rounded-full w-24 h-24 relative bg-[#F0F2F9] flex justify-center items-center">
                <ProfileIcon classname="w-[40%]"/>
                {/* <div className="w-8 h-8 bg-secondary flex justify-center items-center rounded-full absolute right-0 bottom-0 translate-x-[5%] translate-y-[5%]">
                    <PencilIcon classname="w-[40%]"/>
                </div> */}
            </div>
            <div className="flex flex-col gap-2 lg:grid lg:grid-rows-4 lg:gap-2 w-[80%]">
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <TextBox value={profile.first_name} colored={true} name="first_name">Nama Depan</TextBox>
                        <TextBox value={profile.last_name} colored={true} name="last_name">Nama Belakang</TextBox>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <DropdownField value={profile.university} colored={true} list={universities} name="university" label="Universitas">Pilih universitas</DropdownField>
                        <DropdownField value={profile.study_program} colored={true} list={studyPrograms} name="study_program" label="Program Studi">Pilih Program Studi</DropdownField>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <TextBox value={profile.starting_year} colored={true} name="starting_year">Tahun Masuk Perkuliahan</TextBox>
                        <TextBox value={profile.email} colored={true} name="email">Alamat Email</TextBox>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <TextBox placeholder="isi untuk mengubah" colored={true} name="password" type="password">Kata Sandi</TextBox>
                        <TextBox placeholder="isi untuk mengubah" colored={true} name="confirm_password" type="text">Konfirmasi Kata Sandi</TextBox>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-2 lg:gap-8">
                        <DropdownField colored={true} list={banks} name="bank_id" label="Bank">Pilih Bank</DropdownField>
                        <TextBox colored={true} name="account_number" type="text">Nomor Rekening</TextBox>
                    </div>
                    <div>
                        <FileBox message="PNG atau JPG (MAX. 1MB)." name="ktp_image">Foto KTP</FileBox>
                    </div>
                    <div className="flex justify-between mt-4">
                        <SquareButton type="button" onclick={handleSubmit} colorCode="bg-primary">Ubah</SquareButton>
                        <SquareButton type="button" onclick={handleLogout} colorCode="bg-red-500">Logout</SquareButton>
                    </div>
            </div>
        </section>
        <Footer />
        </>
    );
}

export default ProfilePage;