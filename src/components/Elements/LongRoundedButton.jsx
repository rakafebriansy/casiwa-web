function LongRoundedButton(props) {
    const { colorCode = 'bg-primary', children, textColorCode = "text-white" } = props;
    return (
        <button className={`w-full h-12 text-base py-0 md:text-base md:w-24 shadow-md rounded-full ${colorCode} ${textColorCode} font-montserratSemiBold`}>
            {children}
        </button>
    );
}

export default LongRoundedButton