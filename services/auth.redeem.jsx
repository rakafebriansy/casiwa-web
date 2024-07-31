import axios from "axios";

export const redeem = (data, token, callback) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/redeem', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        console.log(res)
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}