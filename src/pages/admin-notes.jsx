import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import SearchButton from "../components/Elements/SearchButton";
import SearchDropdown from "../components/Elements/SearchDropdown";
import {BookIcon, UniversityIcon} from "../functions/svgs";
import Footer from "../components/Layout/Footer";
import { getAllUserDetails } from "../../services/util.userDetail.jsx";
import NoteList from "../components/Layout/NoteList";
import { authenticatedAdmin } from "../../services/auth.authenticatedUser.jsx";
import { AnchorListContext } from "../contexts/AnchorList";
import { getCookie } from "../functions/main";
import { getNotes, getNotesByFilter } from "../../services/util.notes.jsx";
import { useLocation } from "react-router-dom";
import { LoadingIcon } from '../functions/svgs';
import Alert from "../components/Elements/Alert";

const AdminNotesPage = () => {
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {anchorList} = useContext(AnchorListContext);
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const keyword = queryParams.get('keyword');

    const handleSearch = async (e) => {
        e.preventDefault();
        const form = e.target;
        if(form.university_id || form.study_program_id) {
            getNotesByFilter((data) => {
                setNotes(data);
            }, form.university_id.value, form.study_program_id.value, form.keyword.value);
        } else {
            getNotes((data) => {
                setNotes(data);
            },form.keyword.value);
        }
    }

    useEffect(()=> {
        getAllUserDetails('universities',(data) => {
            setUniversities(data.data);
        });
        getAllUserDetails('study-programs',(data) => {
            setStudyPrograms(data.data);
        });
        getNotes((data) => {
            setNotes(data);
        },keyword);
        const adminData = getCookie('admin');
        if(adminData) {
            authenticatedAdmin(adminData.token,
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
        <section className="bg-backgroundPrime pt-20 lg:pt-28 font-montserratRegular min-h-screen justify-between flex flex-col items-center">
            {universities.length > 0 && studyPrograms.length > 0 && (
                <>
                <Navbar isAdmin={isLogin} anchors={isLogin ? anchorList[1] : []} isThisPage="Catatan" isLogin={isLogin}/>
                <div className=" flex flex-col items-center w-[90%] lg:w-[80%]">
                    <form onSubmit={handleSearch} className="w-[80%] lg:w-full mb-5">
                        <SearchButton name="keyword">Cari dokumen</SearchButton>
                        <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex ">
                            <SearchDropdown name={'university_id'} list={universities} icon={<UniversityIcon classname="w-3"/>}>Pilih Universitas</SearchDropdown>
                            <SearchDropdown name={'study_program_id'} list={studyPrograms} icon={<BookIcon classname="w-3"/>}>Pilih Program Studi</SearchDropdown>
                        </div>
                        <div className="w-full text-xs">
                            {notes.total} hasil
                        </div>
                    </form>
                </div>
                <div className="lg:w-[80%] mb-5">
                    {notes.data && notes.data.length > 0 ? (
                        <ul className="flex flex-col gap-5">
                        {notes.data.map((item, index) => {
                            return (
                                <NoteList isAdmin={isLogin} item={item} index={index}/>
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
                </>
            )}
        </section>
    );
};

export default AdminNotesPage;