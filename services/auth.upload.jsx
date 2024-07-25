import axios from "axios";

export const upload = (data, token, callback) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/upload', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data.data);
    }).catch(res => {
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}