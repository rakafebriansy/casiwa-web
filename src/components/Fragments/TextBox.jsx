import Label from "../Elements/Label";
import InputText from "../Elements/InputText";

const TextBox = (props) => {
    const {children, name, type, placeholder, colored, value} = props;
    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <Label name={name}>{children}</Label>
            <InputText placeholder={placeholder} value={value} colored={colored} name={name} type={type}/>
        </div>
    );
}

export default TextBox;