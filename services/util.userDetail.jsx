import axios from "axios";
import { getErrorMessage } from "./errorHelper";

export const getAllUserDetails = (prefix,callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + prefix).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const modifyUserDetails = (token, operation, prefix, data, callback, errorHandler, finallyHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'admin/' + prefix + '/' + operation, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(err => {
        errorHandler({
            status: false,
            message: getErrorMessage(err)
        });
    }).finally(finallyHandler);
}
export const getUserBalance = (token, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'user/get-balance',{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}