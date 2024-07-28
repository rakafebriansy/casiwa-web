import axios from "axios";

export const getUniversities = (callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'universities').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const getStudyPrograms = (callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'study-programs').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const getBanks = (callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'banks').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}