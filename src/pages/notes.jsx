import { useContext, useEffect, useState } from "react";
import { AuthorizedContext } from "../contexts/Authorized";
import Navbar from "../components/Layout/Navbar";
import { getAnchorList } from "../functions/static";
import SearchButton from "../components/Elements/SearchButton";
import SearchDropdown from "../components/Elements/SearchDropdown";
import {BookIcon, UniversityIcon} from "../functions/svgs";
import documentPreviewImage from "../assets/images/document-preview.png"
import Footer from "../components/Layout/Footer";
import { getStudyPrograms, getUniversities } from "../../services/list.userDetail.mjs";
import NoteList from "../components/Layout/NoteList";


const NotesPage = () => {
    const {isAuthorized} = useContext(AuthorizedContext);
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);

    useEffect(()=> {
        getUniversities((data) => {
            setUniversities(data.data);
        });
        getStudyPrograms((data) => {
            setStudyPrograms(data.data);
        });
    },[]);

    return (
        <main className="bg-backgroundPrime pt-20 lg:pt-28 font-montserratRegular flex flex-col items-center">
            {universities.length > 0 && studyPrograms.length > 0 && (
                <>
                <Navbar anchors={getAnchorList(isAuthorized.success)} isLogin={isAuthorized.success}/>
                <div className=" flex flex-col items-center lg:w-[80%]">
                    <div className="w-[80%] lg:w-full mb-5">
                        <SearchButton/>
                        <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex ">
                            <SearchDropdown list={universities} icon={<UniversityIcon classname="w-3"/>}>Universitas</SearchDropdown>
                            <SearchDropdown list={studyPrograms} icon={<BookIcon classname="w-3"/>}>Program Studi</SearchDropdown>
                        </div>
                        <div className="w-full text-xs">
                            3057 hasil
                        </div>
                    </div>
                    <div className="w-full mb-5">
                        <NoteList preview={documentPreviewImage} list={['ini','diganti','data api']}/>
                    </div>
                </div>
                <Footer />
                </>
            )}
        </main>
    );
};

export default NotesPage;