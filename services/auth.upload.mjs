import axios from "axios";
import { baseURL } from "./env.mjs";

export const upload = (data, token, callback) => {
    axios.post(baseURL + 'user/upload', data, {
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