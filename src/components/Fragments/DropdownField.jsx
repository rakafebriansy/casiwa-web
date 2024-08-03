import { useEffect, useRef, useState } from "react";
import InputDropdown from "../Elements/InputDropdown";
import Label from "../Elements/Label";

const DropdownField = (props) => {
    const {children, name, value = {id:null,name:null}, label, list, colored} = props;

    const refBtnClicked = useRef(null);
    const refDropdownClicked = useRef(null);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clicked) {
            refBtnClicked.current.querySelector('svg').classList.add('rotate-180');
            refBtnClicked.current.classList.remove('rounded-lg');
            refBtnClicked.current.classList.add('rounded-t-lg');
        } else {
            refBtnClicked.current.querySelector('svg').classList.remove('rotate-180');
            refBtnClicked.current.classList.remove('rounded-t-lg');
            refBtnClicked.current.classList.add('rounded-lg');
        }
    }, [clicked])

    const dropdownToggle = () => {
        setClicked(!clicked);
    };

    const dropdownClicked = (id, text) => {
        refBtnClicked.current.children[1].innerText = text;
        refBtnClicked.current.firstElementChild.value = id;
        dropdownToggle();
    };

    const outsideClicked = (event) => {
        if (refBtnClicked.current && !refDropdownClicked.current.contains(event.target) && !refBtnClicked.current.contains(event.target)) {
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
        <div className="font-montserratRegular flex flex-col w-full select-none">
            <Label name={name}>{label}</Label>
            <div className="relative">
                <InputDropdown colored={colored} name={name} value={value.id ? value.id : undefined} ref={refBtnClicked} onclick={dropdownToggle}>{value.name ?? children}</InputDropdown>
                <ul ref={refDropdownClicked} className={` ${clicked ? 'flex' : 'hidden'} max-h-20 overflow-scroll overflow-x-hidden flex-col absolute top-9 w-full bg-white border-b border-x border-[#9B9B9B] cursor-pointer pb-1 rounded-b-lg justify-between items-center`} type="text">
                    {list.map(item => {
                        return (
                            <li key={item.id} onClick={() => { dropdownClicked(item.id, item.name) }} className="flex z-10 justify-start w-full bg-white hover:bg-slate-100 px-2 py-1">
                                <input type="hidden" id={item.id} />
                                <p className="text-sm lg:text-base select-none">{item.name}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default DropdownField;