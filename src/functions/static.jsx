export const getAnchorList = (isLogin = false) => {
    if(isLogin) {
        return [
            {name: 'Beranda', path: '/beranda'},
            {name: 'Catatan', path: '/catatan'},
            {name: 'Unggahan', path: '/unggahan'},
            {name: 'Unduhan', path: '/unduhan'},
        ];
    } 
    return [
        {name: 'Beranda', path: '/beranda'},
        {name: 'Catatan', path: '/catatan'},
    ];
}