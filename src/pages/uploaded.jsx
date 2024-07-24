import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import SearchButton from "../components/Elements/SearchButton";
import documentPreviewImage from "../assets/images/document-preview.png"
import Footer from "../components/Layout/Footer";
import NoteList from "../components/Layout/NoteList";
import { authenticatedUser } from "../../services/auth.authenticatedUser.mjs";
import { useNavigate } from "react-router-dom";
import { AnchorListContext } from "../contexts/AnchorList";
import SquareButton from "../components/Elements/SquareButton";
import FormUpload from "../components/Layout/FormUpload";
import { ShowAlertContext } from "../contexts/ShowAlert";
import Alert from "../components/Elements/Alert";
import { getCookie } from "../functions/main";
import { getNotes } from "../../services/list.notes.mjs";

const UploadedPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const [notes, setNotes] = useState([]);
    const navigate = useNavigate();
    const {anchorList} = useContext(AnchorListContext);
    const refUploadDropdown = useRef(null);
    const {isShowAlert} = useContext(ShowAlertContext);

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

        getNotes((data) => {
            setNotes(data);
        });
    },[]);

    if (isLoading) return (<h1>Loading...</h1>);

    return (
        <main className="bg-backgroundPrime pt-20 lg:pt-28 font-montserratRegular flex flex-col items-center relative">
            {isShowAlert.status && (<Alert>{isShowAlert.message}</Alert>)}
            <Navbar anchors={anchorList} isLogin={isLogin}/>
            <div className=" flex flex-col items-center lg:w-[80%]">
                <div className="w-[80%] lg:w-full mb-5">
                    <SearchButton/>
                    <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex">
                        <SquareButton onclick={(e) => {
                            e.preventDefault();
                            refUploadDropdown.current.classList.replace('hidden', 'flex');
                        }} outline={false} colorCode="border-primary hover:bg-primary text-primary">Unggah</SquareButton>
                    </div>
                    <div className="w-full text-xs">
                    {notes.total} hasil
                    </div>
                </div>
                <div className="w-full mb-5">
                    <NoteList notes={notes.data}/>
                </div>
            </div>
            <Footer />
            <FormUpload ref={refUploadDropdown}/>
        </main>
    );
};

export default UploadedPage;