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
    const [universities, setUniversities] = useState([]);
    const [banks, setBanks] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
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
        {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
        {isLogin && universities.length > 0 && studyPrograms.length > 0 && banks.length > 0 && (
            <>
            <Navbar anchors={anchorList} isThisPage="Catatan" isLogin={true}/>
            <section className="flex justify-center min-h-screen w-full pt-28">
                <div className="w-[80%]">
                    <AdminCrudForm editLabel="Nama Baru" prefix="universities" placeholder="Masukkan nama universitas baru" setList={setUniversities} list={universities} columnName="name"></AdminCrudForm>
                </div>
            </section>
            <Footer />
            </>
        )}
        </>
    )
}

export default AdminDashboardPage;