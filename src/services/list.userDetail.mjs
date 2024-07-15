import axios from "axios";

const baseURL = 'http://127.0.0.1:8000/api';

export const getData = (data) => {
    return data;
};

export const getUniversities = (callback) => {
    axios.get(baseURL + '/universities').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const getStudyPrograms = (callback) => {
    axios.get(baseURL + '/study-programs').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}