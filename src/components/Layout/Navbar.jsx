import Signature from "../Elements/Signature";
import SquareButton from "../Elements/SquareButton";

const Navbar = (props) => {
    const {anchors} = props;
    return (
        <nav className="flex w-full justify-center font-montserratRegular">
            <div className="flex w-[90%] justify-between p-4">
                <Signature/>
                <ul className="hidden justify-between gap-4 items-center font-montserratSemiBold text-[#95979E] md:flex">
                    {anchors.map((value) => {
                        return (
                            <li key={value.name}><a href={value.path}>{value.name}</a></li>
                        );
                    })}
                </ul>
                <div className="flex justify-between gap-2 md:gap-8">
                    <SquareButton colorCode="bg-[#25426C]">Masuk</SquareButton>
                    <SquareButton colorCode="bg-[#7A8FC8]">Daftar</SquareButton>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;