import axios from "axios";
import { getErrorMessage } from "./errorHelper";

export const editProfile = (data, token, callback) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/edit-profile', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        callback({
            status: false,
            message: getErrorMessage(res)
        });
    });
}

export const editAdminPassword = (data, token, callback) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'admin/edit-password', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        callback({
            status: false,
            message: getErrorMessage(res)
        });
    });
}