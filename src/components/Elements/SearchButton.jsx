const SearchButton = (props) => {
    const {name, children} = props;
    return (
        <div className="font-montserratSemiBold flex small-shadow rounded-lg">
            <input name={name} type="text" placeholder={children} className="w-[85%] lg:w-[90%] p-2 rounded-l-lg font-montserratRegular text-sm outline-primary" />
            <button type="submit" className="p-2 box-border bg-secondary rounded-r-lg w-[15%] lg:w-[10%] flex justify-center items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4121 14.4121L20 20" stroke="white" strokeLinecap="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z" stroke="white"/>
                </svg>
            </button>
        </div>
    );
}

export default SearchButton;