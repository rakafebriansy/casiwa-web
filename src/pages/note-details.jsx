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
        <main className="pt-20 flex justify-center font-montserratRegular">
            <div className="w-[80%] gap-3 flex flex-col">
                <Link to="/notes" className="text-blue-500 text-xs">&lt;&lt; Kembali ke Daftar</Link>
                <div className="flex flex-col items-start text-sm gap-3">
                    <h1 className="text-xl font-montserratBold">Rangkuman Transformasi Geometri Matematika Murni</h1>
                    <p>Mencakup berbagai jenis transformasi geometri termasuk translasi, refleksi, rotasi, dilatasi, dan penggunaan matriks dalam Mencakup berbagai jenis transformasi geometri termasuk translasi, refleksi, rotasi, dilatasi, dan penggunaan matriks dalam transformasi. </p>
                    <div className="flex flex-col text-xs">
                        <p>Oleh: Tria Putri Ananda, Statistika, Universitas Jember</p>
                        <p className="font-montserratSemiBold">04 Februari 2024</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-4 mt-5">
                    <SquareButton colorCode="bg-primary">Unduh</SquareButton>
                    <div className="bg-backgroundPrime w-full h-[35rem] relative small-shadow">
                        <canvas className="w-full h-full"></canvas>
                        <div className="absolute flex bg-white py-3 small-shadow flex-col gap-2 items-center w-full bottom-0  text-sm">
                            <Signature/>
                            <p className="font-montserratSemiBold">Preview</p>
                            <p className="text-xs">Login untuk mengunduh.</p>
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