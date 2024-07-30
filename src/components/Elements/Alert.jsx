import React, { useContext } from "react";
import { ShowAlertContext } from "../../contexts/ShowAlert";

const Alert = (props) => {

    const {children, color = 'blue'} = props;
    const {setIsShowAlert} = useContext(ShowAlertContext);

    return (
        <div className={`p-4 flex fixed z-50 top-32 left-1/2 -translate-x-1/2 mb-4 text-sm rounded-lg dark:bg-gray-800 text-${color}-800 bg-${color}-50 dark:text-${color}-400 lg:text-xl`} role="alert">
            <div className="ms-3 text-sm font-medium">
                {children}
            </div>
            <button type="button" onClick={()=>{setIsShowAlert({status:false}); console.log('ok')}} className="ms-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    );
}
export default Alert;