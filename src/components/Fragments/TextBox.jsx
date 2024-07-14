import Label from "../Elements/Label";
import InputText from "../Elements/InputText";

const TextBox = (props) => {
    const {children, name, id=''} = props;
    return (
        <div className="font-montserratRegular flex flex-col w-full">
            <Label name={name}>{children}</Label>
            <InputText name={name} id={id}/>
        </div>
    );
}

export default TextBox;