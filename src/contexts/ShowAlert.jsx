import { createContext, useEffect, useState } from "react";

export const ShowAlertContext = createContext();
const ShowAlertContextProvider = ({children}) => {
    const [isShowAlert, setIsShowAlert] = useState({});

    useEffect(() => {
        if(isShowAlert) {
            setTimeout(() => {
                setIsShowAlert(false);
            }, 8000);
        }
    }, [isShowAlert])
    return (
        <ShowAlertContext.Provider value={{ isShowAlert, setIsShowAlert }}>
            {children}
        </ShowAlertContext.Provider>
    )
}

export default ShowAlertContextProvider;