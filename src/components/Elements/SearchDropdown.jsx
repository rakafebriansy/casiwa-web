import { useEffect, useRef, useState } from "react";

const SearchDropdown = (props) => {
    const {children, icon, list, name} = props;
    const [clicked, setClicked] = useState(false);
    const refText = useRef(null);
    const refValue = useRef(null);
    const refBtn = useRef(null);

    const dropdownToggle = () => {
        setClicked(!clicked);
    };

    const dropdownClicked = (id, text) => {
        refText.current.innerText = text;
        refValue.current.value = id;
        dropdownToggle();
    };

    const outsideClicked = (event) => {
        if (refBtn.current && !refBtn.current.contains(event.target) && !event.target.classList.contains('dropdown-li')) {
          setClicked(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', outsideClicked);
        return () => {
            document.removeEventListener('mousedown', outsideClicked);
        };
    },[]);

    return (
        <div className="text-xs w-full lg:w-fit select-none">
            <input ref={refValue} type="hidden" name={name}/>
            <button ref={refBtn} onClick={dropdownToggle} className={`font-montserratSemiBold justify-between w-full px-3 py-2 bg-white ${clicked? 'rounded-t-lg border-t border-x rounded-ss-lg' : 'border rounded-lg'} inline-flex gap-3 items-center`}>
                {icon}
                <span className="hover:text-blue-500" ref={refText}>
                    {children}
                </span>
                <svg className="w-2" width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="13.3333" height="8" fill="url(#pattern0_308_1285)" fillOpacity="0.5"/>
                    <defs>
                        <pattern id="pattern0_308_1285" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_308_1285" transform="matrix(0.00195312 0 0 0.00325521 0 -0.333333)"/>
                        </pattern>
                        <image id="image0_308_1285" width="512" height="512" xlinkHref="data:image/png;base64,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"/>
                    </defs>
                </svg>
            </button>
            <div className="w-full relative">
                <ul className={`${clicked? 'flex': 'hidden'} w-full text-start max-h-20 border-x border-b overflow-scroll overflow-x-hidden flex-col absolute top-0 bg-white cursor-pointer pb-1 rounded-b-lg justify-between items-center`}>
                    <li key="0" onClick={() => { dropdownClicked(null, children) }} className="flex z-10 justify-start w-full bg-white hover:bg-slate-100 px-2 py-1 dropdown-li">
                        <p className="select-none font-montserratSemiBold dropdown-li">{children}</p>
                    </li>
                    {list.map((item, index) => {
                        return (
                            <li key={index} onClick={() => {dropdownClicked(item.id, item.name) }} className="flex z-10 justify-start w-full bg-white hover:bg-slate-100 px-2 py-1 dropdown-li">
                                <p className="select-none dropdown-li">{item.name}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default SearchDropdown;