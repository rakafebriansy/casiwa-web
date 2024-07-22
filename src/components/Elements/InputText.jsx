const InputText = (props) => {
    const {name, id = '', type="text"} = props;
    return (
        <input className=" h-9 border border-[#9B9B9B] outline-primary p-2 rounded-lg" type={type} name={name} id={id} />
    );
}

export default InputText;