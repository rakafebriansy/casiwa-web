export const getScreenSize = () =>  {
    return {
        height: window.screen.height,
        width: window.screen.width
    };
}

export const setCookie = (name, data, days) => {
    const jsonString = JSON.stringify(data);
    const expDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(jsonString) + '; expires' + expDate + '; path=/';
}

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const jsonString = parts.pop().split(';').shift();
        return JSON.parse(decodeURIComponent(jsonString));
    }
    return {token:null}
}