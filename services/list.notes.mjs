import axios from "axios";
import { baseURL } from "./env.mjs";

export const getNotes = (callback, keyword = '') => {
    console.log(keyword)
    axios.get(baseURL + 'notes?keyword=' + keyword).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}

export const getNotesByFilter = (callback, universityId, studyProgramId, keyword = '') => {
    axios.get(baseURL + 'notes?keyword=' + keyword + "&university_id=" + universityId + "&study_program_id=" + studyProgramId).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}