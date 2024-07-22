const InputTextarea = (props) => {
    const {name, id, children} = props;
    return (
        <textarea id={id} className="py-3 h-28 border border-[#9B9B9B] outline-primary hover:border-primary px-4 block w-full rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" rows="3" placeholder={children}></textarea>
    );
};

export default InputTextarea;