import { Link } from "react-router-dom";

const SquareButton = (props) => {
    const { colorCode, children, path = "#", onclick = () => {}, disabled = false, outline = false, type='link' } = props;
    if(type == 'button' || type == 'submit') {
        if(outline) {
            return (
                <button type={type} onClick={onclick} className={`w-fit relative px-5 text-xs py-0 flex justify-center items-center md:text-sm md:min-w-24 h-8 md:h-10 shadow-lg rounded-md border-2 hover:text-white transition ${colorCode} font-montserratSemiBold`}>
                    <span className="z-10">{children}</span>
                    <div className="absolute top-0 w-full h-full rounded-md hover:opacity-10 opacity-0 bg-black "></div>
                </button>
            );
        }
        return (
            <button disabled={disabled} type={type} onClick={onclick} className={`w-fit relative text-white px-5 text-xs py-0 flex justify-center items-center md:text-sm md:min-w-24 h-8 md:h-10 shadow-lg rounded-md ${colorCode} font-montserratSemiBold ${disabled ? 'bg-slate-300' : ''}`}>
                <span className="z-10 button-hover">{children}</span>
                {!disabled && (<div className="absolute top-0 w-full h-full rounded-md hover:opacity-10 opacity-0 bg-black "></div>)}
            </button>
        );
    }
    if(type == 'link') {
        if(outline) {
            return (
                <Link to={path} className={`w-fit relative px-5 text-xs py-0 flex justify-center items-center md:text-sm md:min-w-24 h-8 md:h-10 shadow-lg rounded-md border-2 hover:text-white transition ${colorCode} font-montserratSemiBold`}>
                    <span className="z-10">{children}</span>
                    <div className="absolute top-0 w-full h-full rounded-md hover:opacity-10 opacity-0 bg-black "></div>
                </Link>
            );
        }
        return (
            <Link to={path} className={`w-fit relative text-white px-5 text-xs py-0 flex justify-center items-center md:text-sm md:min-w-24 h-8 md:h-10 shadow-lg rounded-md ${colorCode} font-montserratSemiBold bg-primary`}>
                <span className="z-10 button-hover">{children}</span>
                <div className="absolute top-0 w-full h-full rounded-md hover:opacity-10 opacity-0 bg-black "></div>
            </Link>
        );
    }
    return (
        <p>Wrong!</p>
    );
}

export default SquareButton;