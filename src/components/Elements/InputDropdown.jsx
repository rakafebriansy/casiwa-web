import React, { useEffect, useRef } from "react";
import { DownArrowIcon } from "../../functions/svgs";

const InputDropdown = React.forwardRef((props,ref) => {
    const {name, value = '', children, onclick, colored} = props;
    const refValue = useRef();
    useEffect(() => {
        refValue.current.value = value;
    },[])

    return (
        <div ref={ref} onClick={onclick} className={`h-9 border-b border-t border-x p-2 cursor-pointer flex justify-between items-center ${colored ? "bg-[#F9F9F9] rounded-md" : "rounded-lg border-[#9B9B9B]"}`} type="text">
            <input type="hidden" ref={refValue} name={name}  />
            <p className="select-none text-sm lg:text-base">{children}</p>
            <DownArrowIcon classname="w-3"/>
        </div>
    );
});

export default InputDropdown;