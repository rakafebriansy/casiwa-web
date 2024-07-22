const InputTextarea = (props) => {
    const {name, children, max, setCount = () => {}} = props;
    return (
        <textarea name={name} onInput={(e) => {
            setCount(100 - e.target.value.length);
        }} maxLength={max} className="py-3 h-28 border border-[#9B9B9B] outline-primary hover:border-primary px-4 block w-full rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" rows="3" placeholder={children}></textarea>
    );
};

export default InputTextarea;