import { useContext } from "react";
import Navbar from "../components/Layout/Navbar";
import { AuthorizedContext } from "../contexts/Authorized";
import { getAnchorList } from "../functions/static";
import Modal from "../components/Elements/Modal";
import { Link } from "react-router-dom";
import SquareButton from "../components/Elements/SquareButton";
import Signature from "../components/Fragments/Signature";
import Footer from "../components/Layout/Footer";

const NoteDetailsPage = () => {
    const {isAuthorized} = useContext(AuthorizedContext);
    
    return (
        <>
        <Navbar anchors={getAnchorList(isAuthorized.success)} isLogin={isAuthorized.success} />
        <main className="pt-20 flex lg:pt-28 justify-center font-montserratRegular">
            <div className="w-[80%] gap-3 flex flex-col">
                <Link to="/notes" className="text-blue-500 text-xs lg:text-sm ">&lt;&lt; <span className="hover:underline">Kembali ke Daftar</span></Link>
                <div className="flex flex-col items-start text-sm gap-3 lg:gap-4">
                    <h1 className="text-xl font-montserratBold lg:text-3xl">Rangkuman Transformasi Geometri Matematika Murni</h1>
                    <p className="lg:text-base">Mencakup berbagai jenis transformasi geometri termasuk translasi, refleksi, rotasi, dilatasi, dan penggunaan matriks dalam Mencakup berbagai jenis transformasi geometri termasuk translasi, refleksi, rotasi, dilatasi, dan penggunaan matriks dalam transformasi. </p>
                    <div className="flex flex-col text-xs lg:text-sm">
                        <p>Oleh: Tria Putri Ananda, Statistika, Universitas Jember</p>
                        <p className="font-montserratSemiBold">04 Februari 2024</p>
                    </div>
                </div>
                <div className="flex flex-col items-start mt-5">
                    <div className="flex flex-col items-end gap-4 lg:gap-6  lg:w-[80%]">
                        <SquareButton colorCode="bg-primary">Unduh</SquareButton>
                        <div className="bg-backgroundPrime w-full h-[35rem] lg:h-[55rem] relative small-shadow ">
                            <canvas className="w-full h-full"></canvas>
                            <div className="absolute flex bg-white py-3 small-shadow flex-col gap-2 lg:gap-3 items-center w-full bottom-0 text-sm lg:text-base">
                                <Signature/>
                                <p className="font-montserratSemiBold">Preview</p>
                                <p className="text-xs lg:text-sm">Login untuk mengunduh.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </main>
        </>
    );
};

export default NoteDetailsPage;