import axios from "axios";
import { baseURL } from "./env.mjs";

export const register = (data, callback) => {
    axios.post(baseURL + '/users', data).then(res => {
        callback(res.data.data);
    }).catch(res => {
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}