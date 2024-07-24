import axios from "axios";
import { baseURL } from "./env.mjs";

export const getUniversities = (callback) => {
    axios.get(baseURL + 'universities').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const getStudyPrograms = (callback) => {
    axios.get(baseURL + 'study-programs').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}