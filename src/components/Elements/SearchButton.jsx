const SearchButton = () => {
    return (
        <div className="font-montserratSemiBold flex">
            <input type="text" placeholder="Cari dokumen" className="w-[85%] lg:w-[90%] p-2 rounded-l-lg font-montserratRegular text-sm" />
            <button className="p-2 box-border bg-secondary rounded-r-lg w-[15%] lg:w-[10%] flex justify-center items-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.4121 14.4121L20 20" stroke="white" stroke-linecap="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16Z" stroke="white"/>
                </svg>
            </button>
        </div>
    );
}

export default SearchButton;