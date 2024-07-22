import InputTextarea from "../Elements/InputTextarea";
import Label from "../Elements/Label";

const TextareaBox = (props) => {
    const {children, name, id='', placeholder} = props;
    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <div className="flex items-center justify-between">
                <Label name={name}>{children}</Label>
                <span className="block text-sm text-gray-500 dark:text-neutral-500">100 karakter</span>
            </div>
            <InputTextarea name={name} id={id}>{placeholder}</InputTextarea>
        </div>
    );
}

export default TextareaBox;