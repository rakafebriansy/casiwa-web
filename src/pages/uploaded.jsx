import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import SearchButton from "../components/Elements/SearchButton";
import Footer from "../components/Layout/Footer";
import NoteList from "../components/Layout/NoteList";
import { authenticatedUser } from "../../services/auth.authenticatedUser.jsx";
import { useNavigate } from "react-router-dom";
import { AnchorListContext } from "../contexts/AnchorList";
import SquareButton from "../components/Elements/SquareButton";
import FormUpload from "../components/Layout/FormUpload";
import { ShowAlertContext } from "../contexts/ShowAlert";
import Alert from "../components/Elements/Alert";
import { getCookie } from "../functions/main";
import { getUploadedNotes } from "../../services/util.notes.jsx";
import { LoadingIcon } from '../functions/svgs';

const UploadedPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();
    const {isShowAlert} = useContext(ShowAlertContext);
    const [notes, setNotes] = useState([]);
    const refUploadDropdown = useRef(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        const userData = getCookie('user');
        getUploadedNotes((data) => {
            setNotes(data);
        },userData.token,e.target.keyword.value);
    }

    useEffect(()=> {
        const userData = getCookie('user')
        if(userData) {
            authenticatedUser(userData.token,
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

        getUploadedNotes((data) => {
            setNotes(data);
        },userData.token);
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );

    return (
        <section className="bg-backgroundPrime pt-20 min-h-screen lg:pt-28 font-montserratRegular flex flex-col items-center justify-between relative">
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            <Navbar anchors={anchorList} isThisPage="Unggahan" isLogin={isLogin}/>
            <div className=" flex flex-col items-center lg:w-[80%]">
                <form onSubmit={handleSearch} className="w-[80%] lg:w-full mb-5">
                    <SearchButton name="keyword">Cari dokumen</SearchButton>
                    <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex">
                        <SquareButton type="button" onclick={(e) => {
                            e.preventDefault();
                            refUploadDropdown.current.classList.replace('hidden', 'flex');
                        }} colorCode="border-primary hover:bg-primary text-primary">Unggah</SquareButton>
                    </div>
                    <div className="w-full text-xs">
                    {notes.total} hasil
                    </div>
                </form>
            </div>
            <div className="lg:w-[80%] mb-5">
                <NoteList notes={notes.data}/>
            </div>
            <Footer />
            <FormUpload ref={refUploadDropdown}/>
        </section>
    );
};

export default UploadedPage;