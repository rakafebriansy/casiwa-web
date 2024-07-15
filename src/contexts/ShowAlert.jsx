import { createContext, useState } from "react";

export const ShowAlertContext = createContext();
const ShowAlertContextProvider = ({children}) => {
    const [isShowAlert, setIsShowAlert] = useState({});
    return (
        <ShowAlertContext.Provider value={{ isShowAlert, setIsShowAlert }}>
            {children}
        </ShowAlertContext.Provider>
    )
}

export default ShowAlertContextProvider;