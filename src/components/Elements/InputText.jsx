const InputText = (props) => {
    const {name, id = ''} = props;
    return (
        <input className=" h-9 border border-[#9B9B9B] p-2 rounded-lg" type="text" name={name} id={id} />
    );
}

export default InputText;