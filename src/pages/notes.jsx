import { useContext, useEffect, useState } from "react";
import { AuthorizedContext } from "../contexts/Authorized";
import Navbar from "../components/Layout/Navbar";
import { getAnchorList } from "../functions/static";
import SearchButton from "../components/Elements/SearchButton";
import SearchDropdown from "../components/Elements/SearchDropdown";
import {BookIcon, DownloadCountIcon, UniversityIcon} from "../functions/svgs";
import documentPreviewImage from "../assets/images/document-preview.png"
import Footer from "../components/Layout/Footer";
import { getStudyPrograms, getUniversities } from "../../services/list.userDetail.mjs";


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
        <main className="bg-backgroundPrime font-montserratRegular flex flex-col items-center">
            {universities.length > 0 && studyPrograms.length > 0 && (
                <>
                <Navbar anchors={getAnchorList(isAuthorized.success)} isLogin={isAuthorized.success}/>
                <div className="pt-28 flex flex-col items-center lg:w-[80%]">
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
                        <ul className="flex flex-col gap-5">
                            {['ini','diganti','data api'].map(item => {
                                return (
                                    <li className="flex flex-col gap-4 bg-white rounded-lg small-shadow items-center p-4">
                                        <div className="flex w-full justify-start items-start gap-4">
                                            <div className="h-24 w-24 flex justify-center items-center border">
                                                <img src={documentPreviewImage} className="h-full" alt="" />
                                            </div>
                                            <div className="flex flex-col gap-1 justify-center">
                                                <p className="text-sm font-montserratSemiBold">Rangkuman Transformasi Geometri Matematika Murni</p>
                                                <p className="text-xs">Statistika • Universitas Jember • 2024</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end border-t border-slate-300 w-full py-1">
                                            <div className="flex gap-1 items-center">
                                                <DownloadCountIcon classname="w-2 lg:w-3"/>
                                                <span className="text-xs lg:text-sm">8</span>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <Footer />
                </>
            )}
        </main>
    );
};

export default NotesPage;