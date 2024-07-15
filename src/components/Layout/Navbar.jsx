import Signature from "../Fragments/Signature";
import SquareButton from "../Elements/SquareButton";
import ProfilePicture from "../Elements/ProfilePicture";


const Navbar = (props) => {
    const {anchors, isLogin = false} = props;
    return (
        <nav className="flex w-full justify-center font-montserratRegular fixed top-0 z-30 bg-white">
            <div className="flex w-[90%] justify-between items-center p-4">
                <Signature/>
                <ul className="hidden justify-between gap-4 items-center font-montserratSemiBold text-[#95979E] md:flex">
                    {anchors.map((value) => {
                        return (
                            <li key={value.name}><a href={value.path}>{value.name}</a></li>
                        );
                    })}
                </ul>
                {isLogin ? (
                    <ProfilePicture/>
                ):(
                    <div className="flex justify-between gap-2 md:gap-8">
                        <SquareButton path="/login" colorCode="bg-primary">Masuk</SquareButton>
                        <SquareButton path="/register" colorCode="bg-secondary">Daftar</SquareButton>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;