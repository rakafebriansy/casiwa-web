export const getAnchorList = (isLogin = false) => {
    if(isLogin) {
        return [
            {name: 'Beranda', path: '/'},
            {name: 'Catatan', path: '/catatan'},
            {name: 'Unggahan', path: '/unggahan'},
            {name: 'Unduhan', path: '/unduhan'},
        ];
    } 
    return [

    ];
}

