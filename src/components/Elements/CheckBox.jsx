import { FaCheck } from "react-icons/fa";

const CheckBox = (props) => {
    const {name, id=""} = props;
    return (
        <>
            <label htmlFor={name} className="relative cursor-pointer flex items-center ">
                <input name={name} type="checkbox" value="" id="checkbox-1" className="cursor-pointer appearance-none w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                <FaCheck className="absolute top-[45%] hidden right-1/2 translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] transition check-1"/>
            </label>
        </>
    );
};

export default CheckBox;