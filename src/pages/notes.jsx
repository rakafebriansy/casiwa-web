import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Layout/Navbar";
import SearchButton from "../components/Elements/SearchButton";
import SearchDropdown from "../components/Elements/SearchDropdown";
import {BookIcon, UniversityIcon} from "../functions/svgs";
import documentPreviewImage from "../assets/images/document-preview.png"
import Footer from "../components/Layout/Footer";
import { getStudyPrograms, getUniversities } from "../../services/list.userDetail.mjs";
import NoteList from "../components/Layout/NoteList";
import { authenticatedUser } from "../../services/auth.authenticatedUser.mjs";
import { AnchorListContext } from "../contexts/AnchorList";
import { getCookie } from "../functions/main";
import { getNotes, getNotesByFilter } from "../../services/list.notes.mjs";


const NotesPage = () => {
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [notes, setNotes] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const {anchorList} = useContext(AnchorListContext);

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
        }
        getUniversities((data) => {
            setUniversities(data.data);
        });
        getStudyPrograms((data) => {
            setStudyPrograms(data.data);
        });
        getNotes((data) => {
            setNotes(data);
        });
    },[]);

    if (isLoading) return (<h1>Loading...</h1>);

    return (
        <main className="bg-backgroundPrime pt-20 lg:pt-28 font-montserratRegular flex flex-col items-center">
            {universities.length > 0 && studyPrograms.length > 0 && (
                <>
                <Navbar anchors={isLogin ? anchorList : []} isLogin={isLogin}/>
                <div className=" flex flex-col items-center lg:w-[80%]">
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
                    <div className="w-full mb-5">
                        <NoteList notes={notes.data}/>
                    </div>
                </div>
                <Footer />
                </>
            )}
        </main>
    );
};

export default NotesPage;