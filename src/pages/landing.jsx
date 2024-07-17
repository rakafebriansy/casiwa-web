import DottedCard from "../components/Elements/DottedCard";
import Hero from "../components/Elements/Hero";
import SearchButton from "../components/Elements/SearchButton";
import Navbar from "../components/Layout/Navbar"
import { getAnchorList } from "../functions/static";

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
        <div>
            <h1 className="text-2xl font-montserratBold text-[#4A4A4A] text-center my-8">Kenapa Harus CASIWA ?</h1>
            <ul className="flex flex-col items-center gap-8">
                <DottedCard/>
                <DottedCard/>
                <DottedCard/>
            </ul>
        </div>
        </>
    );
}

export default LandingPage;