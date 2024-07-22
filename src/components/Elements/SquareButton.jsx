import { Link } from "react-router-dom";

const SquareButton = (props) => {
    const { colorCode, children, path = "#", onclick = ()=>{}, outline = false } = props;
    if(outline) {
        return (
            <Link to={path} onClick={onclick} className={`w-fit px-5 text-xs py-0 flex justify-center items-center md:text-sm md:min-w-24 h-8 md:h-10 shadow-lg rounded-md border-2 hover:text-white transition ${colorCode} font-montserratSemiBold`}>
                {children}
            </Link>
        );
    }
    return (
        <Link to={path} onClick={onclick} className={`w-fit relative text-white px-5 text-xs py-0 flex justify-center items-center md:text-sm md:min-w-24 h-8 md:h-10 shadow-lg rounded-md ${colorCode} font-montserratSemiBold bg-primary`}>
            <span className="z-10 button-hover">{children}</span>
            <div className="absolute top0 w-full h-full rounded-md hover:opacity-15 opacity-0 bg-black "></div>
        </Link>
    );
}

export default SquareButton;