import { createContext, useState } from "react";

export const AnchorListContext = createContext();
const AnchorListContextProvider = ({children}) => {
    const [anchorList, setAnchorList] = useState([
        [
            {name: 'Beranda', path: '/'},
            {name: 'Catatan', path: '/notes'},
            {name: 'Unggahan', path: '/uploaded'},
            {name: 'Unduhan', path: '/downloaded'},
            {name: 'Profile', path: '/profile'},
            {name: 'Redeem', path: '/redeem'},
        ],
        [
            {name: 'Dasbor', path: '/admin/dashboard'},
            {name: 'Catatan', path: '/admin/notes'},
            {name: 'Profile', path: '/admin/profile'},
            {name: 'Redeem', path: '/admin/redeem'},
        ]
    ]);
    return (
        <AnchorListContext.Provider value={{ anchorList, setAnchorList }}>
            {children}
        </AnchorListContext.Provider>
    )
}

export default AnchorListContextProvider;
