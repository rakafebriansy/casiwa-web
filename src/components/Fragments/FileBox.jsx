import InputFile from "../Elements/InputFile";
import Label from "../Elements/Label";

const FileBox = (props) => {
    const {children, name, disabled ,dropzone, message} = props;
    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <Label name={name}>{children}</Label>
            <InputFile disabled={disabled} message={message} name={name} dropzone={dropzone}/>
        </div>
    );
}

export default FileBox;