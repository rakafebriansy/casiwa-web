import { Link } from "react-router-dom";
import Signature from "../Fragments/Signature";
import Copyright from "../Elements/Copyright";

const Footer = () => {
    return (
    <div className="flex-col flex py-8 items-center">
        <div className="w-[80%] pb-5">
            <div className="pb-10">
                <Signature isFooter={true}/>
            </div>
            <div className="grid grid-rows-2">
                <div className="font-montserratMedium text-[#25426C] text-sm flex justify-between w-full">
                    <div className="">
                        <h3 className="font-montserratBold text-base mb-3">Pintasan</h3>
                        <ul className="gap-2">
                            <li><Link to="#">Cari Catatan</Link></li>
                            <li><Link to="#">Unggah Catatan</Link></li>
                            <li><Link to="#">Profil Saya</Link></li>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="font-montserratBold text-base mb-3">Tentang Kami</h3>
                        <ul className="gap-2">
                            <li><Link to="#">Email</Link></li>
                            <li><Link to="#">Instagram</Link></li>
                            <li><Link to="#">Facebook</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="font-montserratMedium text-[#25426C] text-sm flex justify-between w-full">
                    <div  className="">
                        <h3 className="font-montserratBold text-base mb-3">Lainnya</h3>
                        <ul className="gap-2">
                            <li><Link to="#">Syarat dan Ketentuan</Link></li>
                            <li><Link to="#">Layanan Pelanggan</Link></li>
                            <li><Link to="#">Kebijakan Privasi</Link></li>
                            <li><Link to="#">Kontak Darurat</Link></li>
                            <li><Link to="#">FAQ</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Copyright/>
    </div>
    );
}

export default Footer;