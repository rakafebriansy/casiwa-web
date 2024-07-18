import { createContext, useState } from "react";

export const AuthorizedContext = createContext();
const AuthorizedContextProvider = ({children}) => {
    const [isAuthorized, setIsAuthorized] = useState({});
    return (
        <AuthorizedContext.Provider value={{ isAuthorized, setIsAuthorized }}>
            {children}
        </AuthorizedContext.Provider>
    )
}

export default AuthorizedContextProvider;