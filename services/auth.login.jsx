import axios from "axios";

export const login = (data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'login', data).then(res => {
        callback(res.data.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const adminLogin = (data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'admin-login', data).then(res => {
        callback(res.data.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}