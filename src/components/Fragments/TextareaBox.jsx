import { useState } from "react";
import InputTextarea from "../Elements/InputTextarea";
import Label from "../Elements/Label";

const TextareaBox = (props) => {
    const [characterCount, setCharacterCount] = useState(100);
    const {children, name, placeholder, max} = props;
    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <div className="flex items-center justify-between">
                <Label name={name}>{children}</Label>
                <span className="block text-sm text-gray-500 dark:text-neutral-500">{characterCount} karakter</span>
            </div>
            <InputTextarea max={max} setCount={setCharacterCount} name={name}>{placeholder}</InputTextarea>
        </div>
    );
}

export default TextareaBox;