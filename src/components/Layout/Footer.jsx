import { Link } from "react-router-dom";
import Signature from "../Fragments/Signature";
import Copyright from "../Elements/Copyright";

const Footer = () => {
    return (
    <div className="flex-col flex py-8 items-center w-full bg-white select-none">
        <div className="w-[80%] pb-8 flex flex-col lg:flex-row lg:justify-around">
            <div className="pb-10">
                <Signature isFooter={true}/>
            </div>
            <div className="grid grid-rows-2 lg:grid-cols-3 lg:grid-rows-none text-sm lg:text-base">
                <div className="font-montserratMedium text-[#25426C] flex justify-between w-full lg:col-span-2 lg:grid lg:grid-cols-2">
                    <div className="">
                        <h3 className="font-montserratBold text-base lg:text-lg mb-3">Pintasan</h3>
                        <ul className="gap-2">
                            <li><Link to="/notes" className="hover:underline">Cari Catatan</Link></li>
                            <li><Link to="/uploaded" className="hover:underline">Unggah Catatan</Link></li>
                            <li><Link to="/profile" className="hover:underline">Profil Saya</Link></li>
                        </ul>
                    </div>
                    <div className="">
                        <h3 className="font-montserratBold text-base lg:text-lg mb-3">Tentang Kami</h3>
                        <ul className="gap-2">
                            <li><a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=innovatesolutions.mail@gmail.com" className="hover:underline">Email</a></li>
                            <li><a target="_blank" href="https://www.instagram.com/casiwa.id" className="hover:underline">Instagram</a></li>
                            <li><a target="_blank" href="#" className="hover:underline">Facebook</a></li>
                        </ul>
                    </div>
                </div>
                <div className="font-montserratMedium text-[#25426C] w-full">
                    <div  className="">
                        <h3 className="font-montserratBold text-base lg:text-lg mb-3">Lainnya</h3>
                        <ul className="gap-2">
                            <li><Link to="/terms-and-conditions" className="hover:underline">Syarat dan Ketentuan</Link></li>
                            <li><Link to="/privacy-policies" className="hover:underline">Kebijakan Privasi</Link></li>
                            <li><a href="https://api.whatsapp.com/send?phone=6285745605717" className="hover:underline">Kontak Darurat</a></li>
                            <li><Link to="/faqs" className="hover:underline">FAQ</Link></li>
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