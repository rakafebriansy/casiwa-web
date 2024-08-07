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
import { useNavigate } from "react-router-dom";

const DownloadedPage = () => {
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {anchorList} = useContext(AnchorListContext);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = e.target;
        const userData = getCookie('user');
        getDownloadedNotes((data) => {
            setNotes(data);
        },userData.token, form.university_id.value, form.study_program_id.value, form.keyword.value);
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
                navigate('/login');
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
        <Navbar anchors={isLogin ? anchorList[0] : []} isThisPage="Unduhan" isLogin={isLogin}/>
            {universities.length > 0 && studyPrograms.length > 0 && (
                <section className="bg-backgroundPrime pt-20 lg:pt-28 font-montserratRegular min-h-screen justify-between flex flex-col items-center">
                    <form onSubmit={handleSearch} className=" flex flex-col items-center w-[90%] lg:w-[80%]">
                        <div className="w-[80%] lg:w-full mb-5">
                            <SearchButton name="keyword">Cari dokumen</SearchButton>
                            <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex ">
                                <SearchDropdown name={'university_id'} list={universities} icon={<UniversityIcon classname="w-3"/>}>Universitas</SearchDropdown>
                                <SearchDropdown name={'study_program_id'} list={studyPrograms} icon={<BookIcon classname="w-3"/>}>Program Studi</SearchDropdown>
                            </div>
                            <div className="w-full text-xs">
                                {notes.total ?? 0} hasil
                            </div>
                        </div>
                    </form>
                    <div className="lg:w-[80%] mb-5">
                    {notes.data && notes.data.length > 0 ? (
                        <ul className="flex flex-col gap-5">
                        {notes.data.map((item, index) => {
                            return (
                                <NoteList item={item} index={index}/>
                            );
                        })}
                        </ul>
                    ) : (
                        <div className="flex justify-center items-center text-primary text-xl">
                            <h3>Tidak ada hasil</h3>
                        </div>
                    )}
                </div>
                    <Footer />
                </section>
            )}
        </>
    );
};

export default DownloadedPage;