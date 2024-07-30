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

export const deleteCookie = (name) => {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

export const parseDate = (inputDate) => {
    const months = [
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    const [day, month, year] = inputDate.split('-').map(Number);
    if (month < 1 || month > 12) {
      throw new Error('Bulan tidak valid');
    }
    return `${day} ${months[month - 1]} ${year}`;
}

export const formatCurrency = (amount, region) => {
    return new Intl.NumberFormat(region).format(amount);
};