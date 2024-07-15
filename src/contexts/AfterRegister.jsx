import { createContext, useState } from "react";

export const AfterRegisterContext = createContext();
const AfterRegisterContextProvider = ({children}) => {
    const [isAfterRegister, setIsAfterRegister] = useState({});
    return (
        <AfterRegisterContext.Provider value={{ isAfterRegister, setIsAfterRegister }}>
            {children}
        </AfterRegisterContext.Provider>
    )
}

export default AfterRegisterContextProvider;