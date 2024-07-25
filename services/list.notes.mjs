import axios from "axios";
import { baseURL } from "./env.mjs";

export const getNotes = (callback, keyword = '') => {
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

export const getUploadedNotes = (callback, token, keyword = '') => {
    axios.get(baseURL + 'user/uploaded-notes?keyword=' + keyword, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const getDownloadedNotes = (callback, token, keyword = '') => {
    axios.get(baseURL + 'user/downloaded-notes?keyword=' + keyword, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}

export const getSingleNotePreview = (id, callback) => {
    axios.get(baseURL + 'note-preview?id=' + id).then(res => {
        callback(res.data.data);
    }).catch(err => {
        console.error(err);
    });
}

export const getSingleNote = (id, token, callback) => {
    axios.get(baseURL + 'note-details?id=' + id, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        callback(res.data.data);
    }).catch(err => {
        console.error(err);
    });
}