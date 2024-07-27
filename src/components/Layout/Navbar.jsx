import Signature from "../Fragments/Signature";
import SquareButton from "../Elements/SquareButton";
import ProfilePicture from "../Elements/ProfilePicture";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "../../functions/svgs";


const Navbar = (props) => {
    const {anchors = [], isLogin, isThisPage} = props;
    return (
        <nav className="flex w-full justify-center font-montserratRegular fixed top-0 z-20 bg-white shadow-sm">
            <div className="flex w-[90%] justify-between items-center p-4">
                <Link to={'/'}>
                    <Signature/>
                </Link>
                <ul className="hidden justify-between gap-4 items-center font-montserratSemiBold text-[#95979E] md:flex">
                    {anchors.map((value) => {
                        if(isThisPage == value.name) {
                            return (
                                <li className="underline text-primary" key={value.name}><Link to={value.path}>{value.name}</Link></li>
                            );
                        }
                        return (
                            <li key={value.name} className="hover:text-primary hover:opacity-80"><Link to={value.path}>{value.name}</Link></li>
                        );
                    })}
                </ul>
                {isLogin ? (
                    <>
                    <ProfilePicture classname="hidden lg:block"/>
                    <HamburgerIcon classname="w-5 lg:hidden"/>
                    </>
                ):(
                    <div className="flex justify-between gap-2 md:gap-8">
                        <SquareButton path="/login" colorCode="bg-secondary">Masuk</SquareButton>
                        <SquareButton path="/register" colorCode="text-secondary hover:bg-secondary border-secondary" outline={true}>Daftar</SquareButton>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;