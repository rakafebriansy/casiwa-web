import axios from "axios";

export const getAllUserDetails = (prefix,callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + prefix).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const modifyUserDetails = (token, operation, prefix, data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'admin/' + prefix + '/' + operation, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(err => {
        console.log(err)
        errorHandler({
            status: false,
            message:Object.values(err.response.data.errors)[0][0]
        });
    });
}