import axios from "axios";

export const getNotes = (callback, keyword = '') => {
    axios.get(import.meta.env.VITE_BASE_URL + 'notes?keyword=' + keyword).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}

export const getNotesByFilter = (callback, universityId, studyProgramId, keyword = '') => {
    axios.get(import.meta.env.VITE_BASE_URL + 'notes?keyword=' + keyword + "&university_id=" + universityId + "&study_program_id=" + studyProgramId).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}

export const getUploadedNotes = (callback, token, keyword = '') => {
    axios.get(import.meta.env.VITE_BASE_URL + 'user/uploaded-notes?keyword=' + keyword, {
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
    axios.get(import.meta.env.VITE_BASE_URL + 'user/downloaded-notes?keyword=' + keyword, {
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
    axios.get(import.meta.env.VITE_BASE_URL + 'note-preview?id=' + id).then(res => {
        callback(res.data.data);
    }).catch(err => {
        console.error(err);
    });
}

export const getSingleNote = (id, token, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'note-details?id=' + id, {
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