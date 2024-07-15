import { useEffect, useRef, useState } from "react";
import InputDropdown from "../Elements/InputDropdown";
import Label from "../Elements/Label";

const DropdownField = (props) => {
    const {children, name, id='', label, list} = props;

    const refBtnClicked = useRef(null);
    const refDropdownClicked = useRef(null);

    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        refBtnClicked.current.querySelector('svg').classList.toggle('rotate-180');
        if (clicked) {
            refBtnClicked.current.classList.remove('rounded-lg');
            refBtnClicked.current.classList.add('rounded-t-lg');
        } else {
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
    }

    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <Label name={name}>{label}</Label>
            <div className="relative">
                <InputDropdown name={name} id={'btn-' + id} ref={refBtnClicked} onclick={dropdownToggle}>{children}</InputDropdown>
                <ul ref={refDropdownClicked} id={id} className={` ${clicked ? 'flex' : 'hidden'} max-h-20 overflow-scroll overflow-x-hidden flex flex-col absolute top-9 w-full bg-white border-b border-x border-[#9B9B9B] cursor-pointer pb-1 rounded-b-lg justify-between items-center`} type="text">
                    {list.map(item => {
                        return (
                            <li key={item.id} onClick={() => { dropdownClicked(item.id, item.name) }} className="flex z-10 justify-start w-full bg-white hover:bg-[rgba(0,0,0,0.04)] px-2 py-1">
                                <input type="hidden" id={item.id} />
                                <p className="select-none">{item.name}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default DropdownField;