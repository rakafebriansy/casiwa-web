import Label from "../Elements/Label";
import InputText from "../Elements/InputText";
import { HiddenIcon } from "../../functions/svgs";
import { useEffect, useState } from "react";

const TextBox = (props) => {
    const {children, name, type, placeholder, colored, value} = props;
    const [fixType, setFixType] = useState('');

    useEffect(() => {
        setFixType(type);
    },[]); 

    return (
        <div className="font-montserratRegular flex flex-col w-full gap-1">
            <Label name={name}>{children}</Label>
            <div className="relative">
                <InputText placeholder={placeholder} value={value} colored={colored} name={name} type={fixType}/>
                {type == 'password' && (
                    <HiddenIcon classname="w-4 select-none absolute top-1/2 right-0 -translate-x-3 -translate-y-1/2 cursor-pointer" onclick={() => {
                        if(fixType == 'password') {
                            setFixType('text');
                        } else {
                            setFixType('password');
                        }
                    }}/>
                )}
            </div>
        </div>
    );
}

export default TextBox;