import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import SearchButton from "../components/Elements/SearchButton";
import SearchDropdown from "../components/Elements/SearchDropdown";
import {BookIcon, UniversityIcon} from "../functions/svgs";
import Footer from "../components/Layout/Footer";
import { getAllUserDetails } from "../../services/util.userDetail.jsx";
import NoteList from "../components/Layout/NoteList";
import { authenticatedUser } from "../../services/auth.authenticatedUser.jsx";
import { AnchorListContext } from "../contexts/AnchorList";
import { getCookie } from "../functions/main";
import { getDownloadedNotes, getNotes } from "../../services/util.notes.jsx";
import { LoadingIcon } from '../functions/svgs';

const DownloadedPage = () => {
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {anchorList} = useContext(AnchorListContext);

    const handleSearch = async (e) => {
        e.preventDefault();
        const userData = getCookie('user');
        getDownloadedNotes((data) => {
            setNotes(data);
        },userData.token);
    }

    useEffect(()=> {
        const userData = getCookie('user');
        if(userData) {
            authenticatedUser(userData.token,
                res => {
                setIsLogin(res.data.success);
            }, 
            err => {
                console.log('Unauthenticated');
            }, 
            () => {
                setIsLoading(false);
            });
            getDownloadedNotes((data) => {
                setNotes(data);
            },userData.token);
        }
        getAllUserDetails('universities',(data) => {
            setUniversities(data.data);
        });
        getAllUserDetails('study-programs',(data) => {
            setStudyPrograms(data.data);
        });
    },[]);

    if (isLoading) return (
        <div className="flex justify-center items-center w-full min-h-screen">
            <LoadingIcon classname="animate-spin"/>
        </div>
    );
    
    return (
        <>
        <Navbar anchors={isLogin ? anchorList : []} isThisPage="Unduhan" isLogin={isLogin}/>
            {universities.length > 0 && studyPrograms.length > 0 && (
                <section className="bg-backgroundPrime pt-20 lg:pt-28 font-montserratRegular min-h-screen justify-between flex flex-col items-center">
                    <form onSubmit={handleSearch} className=" flex flex-col items-center lg:w-[80%]">
                        <div className="w-[80%] lg:w-full mb-5">
                            <SearchButton name="keyword">Cari dokumen</SearchButton>
                            <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex ">
                                <SearchDropdown list={universities} icon={<UniversityIcon classname="w-3"/>}>Universitas</SearchDropdown>
                                <SearchDropdown list={studyPrograms} icon={<BookIcon classname="w-3"/>}>Program Studi</SearchDropdown>
                            </div>
                            <div className="w-full text-xs">
                                {notes.total} hasil
                            </div>
                        </div>
                    </form>
                    <div className="lg:w-[80%] mb-5">
                        <NoteList notes={notes.data}/>
                    </div>
                    <Footer />
                </section>
            )}
        </>
    );
};

export default DownloadedPage;