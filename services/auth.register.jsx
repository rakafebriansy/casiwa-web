import axios from "axios";
import { getErrorMessage } from "./errorHelper";

export const register = (data, callback,errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'register', data).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message: getErrorMessage(res)
        });
    });
}