function LongRoundedButton(props) {
    const { colorCode = 'bg-primary', children, textColorCode = "text-white", onclick = ()=>{} } = props;
    return (
        <button type="submit" onClick={onclick} className={`w-full h-12 text-base py-0 md:text-base shadow-md rounded-full ${colorCode} ${textColorCode} font-montserratSemiBold`}>
            {children}
        </button>
    );
}

export default LongRoundedButton