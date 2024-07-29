import axios from "axios";

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
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}