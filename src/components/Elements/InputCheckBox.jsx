import { useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";


const InputCheckBox = (props) => {
    const {name, id=""} = props;

    const refCheckbox = useRef(null);    
    const refCheckmark = useRef(null);

    const checkmarkClicked = () => {
        refCheckbox.current.checked = !(refCheckbox.current.checked);
        refCheckmark.current.classList.toggle('hidden');
    }
    
    const checkboxClicked = () => {
        refCheckmark.current.classList.toggle('hidden');
    }

    return (
        <>
            <div className="relative cursor-pointer flex items-center bg-gray-50">
                <input name={name} type="checkbox" onClick={checkboxClicked} id={id} ref={refCheckbox} className="cursor-pointer appearance-none w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300" />
                <div ref={refCheckmark} className="hidden">
                    <FaCheck onClick={checkmarkClicked} className="absolute top-[50%] right-1/2 translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] transition check-1"/>
                </div>
            </div>
        </>
    );
};

export default InputCheckBox;