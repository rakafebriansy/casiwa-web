import InputFile from "../Elements/InputFile";
import Label from "../Elements/Label";

const FileBox = (props) => {
    const {children, name ,dropzone, message} = props;
    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <Label name={name}>{children}</Label>
            <InputFile message={message} name={name} dropzone={dropzone}/>
        </div>
    );
}

export default FileBox;