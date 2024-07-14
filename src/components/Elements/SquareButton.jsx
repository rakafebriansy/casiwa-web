import { Link } from "react-router-dom";

const SquareButton = (props) => {
    const { colorCode, children, path = "#", textColorCode = "text-white" } = props;
    return (
        <Link to={path} className={`w-16 text-xs py-0 flex justify-center items-center md:text-base md:w-24 shadow-lg rounded-md ${colorCode} ${textColorCode} font-montserratSemiBold`}>
            {children}
        </Link>
    );
}

export default SquareButton;