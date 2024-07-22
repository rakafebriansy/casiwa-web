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
import { useNavigate } from "react-router-dom";
import { AnchorListContext } from "../contexts/AnchorList";
import SquareButton from "../components/Elements/SquareButton";


const UploadedPage = () => {
    const [universities, setUniversities] = useState([]);
    const [studyPrograms, setStudyPrograms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();
    const {anchorList} = useContext(AnchorListContext);

    useEffect(()=> {
        const userData = JSON.parse(localStorage.getItem('user'));
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

        getUniversities((data) => {
            setUniversities(data.data);
        });
        getStudyPrograms((data) => {
            setStudyPrograms(data.data);
        });
    },[]);

    if (isLoading) return (<h1>Loading...</h1>);

    return (
        <main className="bg-backgroundPrime pt-20 lg:pt-28 font-montserratRegular flex flex-col items-center">
            {universities.length > 0 && studyPrograms.length > 0 && (
                <>
                <Navbar anchors={anchorList} isLogin={isLogin}/>
                <div className=" flex flex-col items-center lg:w-[80%]">
                    <div className="w-[80%] lg:w-full mb-5">
                        <SearchButton/>
                        <div className="mt-5 mb-2 grid grid-cols-2 gap-2 lg:flex">
                            <SquareButton outline={false} colorCode="border-primary hover:bg-primary text-primary">Unggah</SquareButton>
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

export default UploadedPage;