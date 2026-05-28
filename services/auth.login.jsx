import axios from "axios";
import { getErrorMessage } from "./errorHelper";

export const login = (data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'login', data).then(res => {
        callback(res.data.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message: getErrorMessage(res)
        });
    });
}

export const adminLogin = (data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'admin/login', data).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message: getErrorMessage(res)
        });
    });
}

export const forgotPassword = (data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'forgot-password', data).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message: getErrorMessage(res)
        });
    });
}

export const resetPassword = (data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'reset-password', data).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message: getErrorMessage(res)
        });
    });
}