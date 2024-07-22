import { createContext, useState } from "react";

export const AnchorListContext = createContext();
const AnchorListContextProvider = ({children}) => {
    const [anchorList, setAnchorList] = useState([
        {name: 'Beranda', path: '/'},
        {name: 'Catatan', path: '/notes'},
        {name: 'Unggahan', path: '/uploaded'},
        {name: 'Unduhan', path: '/downloaded'},
    ]);
    return (
        <AnchorListContext.Provider value={{ anchorList, setAnchorList }}>
            {children}
        </AnchorListContext.Provider>
    )
}

export default AnchorListContextProvider;
