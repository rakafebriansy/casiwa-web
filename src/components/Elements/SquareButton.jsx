const SquareButton = (props) => {
    const { colorCode, children, textColorCode = "text-white" } = props;
    return (
        <button className={`w-16 text-xs py-0 md:text-base md:w-24 shadow-lg rounded-md ${colorCode} ${textColorCode} font-montserratSemiBold`}>
            {children}
        </button>
    );
}

export default SquareButton;