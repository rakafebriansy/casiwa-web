import { useContext, useEffect, useState } from "react";
import AdminCrudForm from "../components/Layout/AdminCrudForm";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar";
import { AnchorListContext } from "../contexts/AnchorList";
import { ShowAlertContext } from "../contexts/ShowAlert";
import Alert from "../components/Elements/Alert";
import { getAllUserDetails } from "../../services/util.userDetail";
import { LoadingIcon } from "../functions/svgs";
import { getCookie } from "../functions/main";
import { authenticatedAdmin } from "../../services/auth.authenticatedUser";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const {isShowAlert} = useContext(ShowAlertContext);
    const {anchorList} = useContext(AnchorListContext);
    const [isLogin, setIsLogin] = useState(false);
    const [universities, setUniversities] = useState([]);
    const [banks, setBanks] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllUserDetails('universities',(data) => {
            setUniversities(data.data);
        });
        getAllUserDetails('study-programs',(data) => {
            setStudyPrograms(data.data);
        });
        getAllUserDetails('banks',(data) => {
            setBanks(data.data);
        });
        const userData = getCookie('admin');
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
        }
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );

    return (
        <>
        <section className="relative min-h-screen flex flex-col gap-12 justify-between items-center w-full pt-28">
        {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
        {isLogin && universities.length > 0 && studyPrograms.length > 0 && banks.length > 0 && (
            <>
            <Navbar isAdmin={isLogin} anchors={anchorList[1]} isThisPage="Dasbor" isLogin={true}/>
                    <div className="w-[80%] flex flex-col justify-center gap-6 lg:gap-12">
                        <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-12">
                            <AdminCrudForm label="Universitas" prefix="universities" placeholder="Masukkan nama universitas baru" setList={setUniversities} list={universities} columnName="name"></AdminCrudForm>
                            <AdminCrudForm label="Program Studi" prefix="study-programs" placeholder="Masukkan nama prodi baru" setList={setStudyPrograms} list={studyPrograms} columnName="name"></AdminCrudForm>
                        </div>
                        <div className="w-full flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-12">
                            <AdminCrudForm label="Bank" prefix="banks" placeholder="Masukkan nama bank baru" setList={setBanks} list={banks} columnName="name"></AdminCrudForm>
                        </div>
                    </div>
            <Footer />
            </>
        )}
        </section>
        </>
    )
}

export default AdminDashboardPage;