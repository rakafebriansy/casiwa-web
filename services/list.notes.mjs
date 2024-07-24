import axios from "axios";
import { baseURL } from "./env.mjs";

export const getNotes = (callback, keyword = '') => {
    axios.get(baseURL + 'notes?keyword=' + keyword).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}