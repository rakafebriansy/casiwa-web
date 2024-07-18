import { Link } from "react-router-dom";

const SquareButton = (props) => {
    const { colorCode, children, path = "#", textColorCode = "text-white", onclick = ()=>{} } = props;
    return (
        <Link to={path} onClick={onclick} className={`w-fit px-2 text-xs py-0 flex justify-center items-center md:text-sm md:min-w-24 h-8 md:h-10 shadow-lg rounded-md ${colorCode} ${textColorCode} font-montserratSemiBold`}>
            {children}
        </Link>
    );
}

export default SquareButton;