const InputText = (props) => {
    const {name, placeholder='', value='', type="text", colored} = props;
    return (
        <input className={`h-9 border ${colored ? "bg-[#F9F9F9] rounded-md" : "rounded-lg border-[#9B9B9B]"} outline-primary hover:border-primary p-2`} type={type} name={name} defaultValue={value} placeholder={placeholder} />
    );
}

export default InputText;