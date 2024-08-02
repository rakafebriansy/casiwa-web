import axios from "axios";

export const register = (data, callback,errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'register', data).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}