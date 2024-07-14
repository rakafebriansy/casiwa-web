import { useEffect, useRef, useState } from "react";
import InputDropdown from "../Elements/InputDropdown";
import Label from "../Elements/Label";

const DropdownField = (props) => {
    const {children, name, id='', label} = props;
    
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
        dropdownToggle();
    }

    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <Label name={name}>{label}</Label>
            <div className="relative">
                <InputDropdown name={name} id={'btn-' + id} ref={refBtnClicked} onclick={dropdownToggle}>{children}</InputDropdown>
                <ul ref={refDropdownClicked} id={id} className={` ${clicked ? 'flex' : 'hidden'} max-h-20 overflow-scroll overflow-x-hidden flex flex-col absolute top-9 w-full bg-white border-b border-x border-[#9B9B9B] cursor-pointer pb-1 rounded-b-lg justify-between items-center`} type="text">
                    <li onClick={() => { dropdownClicked(1, 'Contoh 1') }} className="flex justify-start w-full hover:bg-[rgba(0,0,0,0.04)] px-2 py-1">
                        <input type="hidden" name={name} id={id} />
                        <p className="select-none">Contoh 1</p>
                    </li>
                    <li onClick={() => { dropdownClicked(2, 'Contoh 2') }} className="flex justify-start w-full hover:bg-[rgba(0,0,0,0.04)] px-2 py-1">
                        <input type="hidden" name={name} id={id} />
                        <p className="select-none">Contoh 2</p>
                    </li>
                    <li onClick={() => { dropdownClicked(3, 'Contoh 3') }} className="flex justify-start w-full hover:bg-[rgba(0,0,0,0.04)] px-2 py-1">
                        <input type="hidden" name={name} id={id} />
                        <p className="select-none">Contoh 3</p>
                    </li>
                    <li onClick={() => { dropdownClicked(4, 'Contoh 4') }} className="flex justify-start w-full hover:bg-[rgba(0,0,0,0.04)] px-2 py-1">
                        <input type="hidden" name={name} id={id} />
                        <p className="select-none">Contoh 4</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default DropdownField;