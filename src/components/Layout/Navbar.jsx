import Signature from "../Fragments/Signature";
import SquareButton from "../Elements/SquareButton";
import ProfilePicture from "../Elements/ProfilePicture";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "../../functions/svgs";
import { useRef, useState } from "react";
import CloseButton from "../Elements/CloseButton";


const Navbar = (props) => {
    const [hamburger, setHamburger] = useState(true);
    const refHamburger = useRef(null);
    const {anchors = [], isLogin, isThisPage} = props;
    
    return (
        <nav className="flex w-full justify-center font-montserratRegular items-center fixed top-0 z-20 bg-white shadow-sm min-h-16">
            <div className="flex w-[90%] justify-between items-center px-4">
                <Link className="z-50" to={'/'}>
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
                    {hamburger ? (
                        <HamburgerIcon classname="w-5 lg:hidden z-50" onclick={() => {
                            refHamburger.current.classList.replace('left-full','left-0');
                            setHamburger(false);
                        }}/>
                    ) : (
                        <CloseButton classname="w-5 lg:hidden z-50" onclick={() => {
                            refHamburger.current.classList.replace('left-0','left-full');
                            setHamburger(true);
                        }}/>
                    )}
                    </>
                ):(
                    <div className="flex justify-between gap-2 md:gap-8">
                        <SquareButton path="/login" colorCode="bg-secondary">Masuk</SquareButton>
                        <SquareButton path="/register" colorCode="text-secondary hover:bg-secondary border-secondary" outline={true}>Daftar</SquareButton>
                    </div>
                )}
                <div ref={refHamburger} className="left-full flex transition-all bg-backgroundPrime items-center w-52 absolute justify-center z-30 h-52 top-0 min-h-screen min-w-full">
                    <div className="w-fit flex flex-col justify-center items-center text-center gap-3">
                        <ul className="flex flex-col gap-3">
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
                        <ProfilePicture path="/profile" classname="block"/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;