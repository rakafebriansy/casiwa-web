import InputFile from "../Elements/InputFile";
import Label from "../Elements/Label";

const FileBox = (props) => {
    const {children, name, setFile} = props;
    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <Label name={name}>{children}</Label>
            <InputFile name={name} setFile={setFile}/>
        </div>
    );
}

export default FileBox;