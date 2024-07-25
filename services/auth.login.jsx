import axios from "axios";

export const login = (data, callback) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'login', data).then(res => {
        callback(res.data.data);
    }).catch(res => {
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}