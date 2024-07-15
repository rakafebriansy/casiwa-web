const Alert = (props) => {
    const {children, color} = props;

    return (
        <div className={`p-4 absolute top-32 left-1/2 -translate-x-1/2 mb-4 text-sm rounded-lg dark:bg-gray-800 text-${color}-800 bg-${color}-50 dark:text-${color}-400 lg:text-xl`} role="alert">
            {children}
        </div>
    );
}

export default Alert;