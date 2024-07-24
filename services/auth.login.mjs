import axios from "axios";
import { baseURL } from "./env.mjs";

export const login = (data, callback) => {
    console.log(data);
    axios.post(baseURL + '/login', data).then(res => {
        callback(res.data.data);
    }).catch(res => {
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}