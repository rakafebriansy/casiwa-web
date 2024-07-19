import { useContext } from "react";
import { AuthorizedContext } from "../contexts/Authorized";
import Navbar from "../components/Layout/Navbar";
import { getAnchorList } from "../functions/static";
import SearchButton from "../components/Elements/SearchButton";
import SearchDropdown from "../components/Elements/SearchDropdown";
import {BookIcon, DownloadCountIcon, UniversityIcon} from "../functions/svgs";
import documentPreviewImage from "../assets/images/document-preview.png"
import Footer from "../components/Layout/Footer";

const NotesPage = () => {
    const {isAuthorized} = useContext(AuthorizedContext);

    return (
        <main className="bg-backgroundPrime font-montserratRegular">
            <Navbar anchors={getAnchorList(isAuthorized.success)} isLogin={isAuthorized.success}/>
            <div className="pt-28 flex flex-col items-center">
                <div className="w-[80%] mb-5">
                    <SearchButton/>
                    <div className="mt-5 mb-2 flex gap-3">
                        <SearchDropdown icon={<UniversityIcon classname="w-3"/>}>Universitas</SearchDropdown>
                        <SearchDropdown icon={<BookIcon classname="w-3"/>}>Program Studi</SearchDropdown>
                    </div>
                    <div className="w-full text-xs">
                        3057 hasil
                    </div>
                </div>
                <div className="w-full mb-5">
                    <ul className="flex flex-col gap-5">
                        {[1,2,3].map(item => {
                            return (
                                <li className="flex flex-col gap-2 bg-white rounded-lg small-shadow items-center">
                                <div className="flex w-full justify-between p-2">
                                    <div className="h-24 w-24 flex justify-center items-center">
                                        <img src={documentPreviewImage} className="h-full" alt="" />
                                    </div>
                                    <div className="flex flex-col gap-1 justify-center">
                                        <p className="text-sm font-montserratSemiBold">Rangkuman Transformasi Geometri Matematika Murni</p>
                                        <p className="text-xs">Statistika • Universitas Jember • 2024</p>
                                    </div>
                                </div>
                                <div className="flex justify-end border-t border-slate-300 w-[90%]">
                                    <div className="flex gap-1 items-center">
                                        <DownloadCountIcon classname="w-2"/>
                                        <span className="text-xs">8</span>
                                    </div>
                                </div>
                            </li>
                            );
                        })}
                    </ul>
                </div>
                <Footer />
            </div>
        </main>
    );
};

export default NotesPage;