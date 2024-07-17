import DottedCard from "../components/Elements/DottedCard";
import Hero from "../components/Elements/Hero";
import SearchButton from "../components/Elements/SearchButton";
import Navbar from "../components/Layout/Navbar"
import { getAnchorList } from "../functions/static";
import studyImage from "../assets/images/study.png"
import SquareButton from "../components/Elements/SquareButton";

const LandingPage = () => {
    return (
        <>
        <Navbar anchors={getAnchorList()}/>
        <div className="bg-gradient-to-tr from-[#dfe9f3] via-60% via-white to-white w-full flex justify-center items-center min-h-screen">
            <div className="w-[80%]">
                <div className="flex flex-col gap-10">
                    <Hero />
                    <SearchButton />
                </div>
            </div>
        </div>
        <div className="py-6">
            <h1 className="text-2xl font-montserratBold text-[#4A4A4A] text-center mb-6">Kenapa Harus CASIWA ?</h1>
            <ul className="flex flex-col items-center gap-6">
                <DottedCard/>
                <DottedCard/>
                <DottedCard/>
            </ul>
        </div>
        <div className="py-6 flex justify-center bg-gradient-to-t from-[#dfe9f3] via-60% via-white to-white">
            <div className="flex flex-col items-center gap-8 text-center w-[70%]">
                <img src={studyImage} alt="" />
                <h1 className="text-2xl font-montserratBold text-[#4A4A4A] text-center">Platform Berbagi Catatan Pertama Di Indonesia</h1>
                <SquareButton colorCode="bg-[#25426C]" path="/register">Daftar Sekarang</SquareButton>
            </div>
        </div>
        </>
    );
}

export default LandingPage;