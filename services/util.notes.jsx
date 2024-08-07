import axios from "axios";

export const getNotes = (callback, keyword) => {
    keyword = keyword ?? '';
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

export const getDownloadedNotes = (callback, token, universityId, studyProgramId, keyword = '') => {
    const universityParams = universityId ? "&university_id=" + universityId : '';
    const studyProgramParams = studyProgramId ? "&study_program_id=" + studyProgramId : '';
    axios.get(import.meta.env.VITE_BASE_URL + 'user/downloaded-notes?keyword=' + keyword + universityParams + studyProgramParams, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
    .then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}

export const getSingleNotePreview = (id, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'note-preview?id=' + id).then(res => {
        callback(res.data.data);
    }).catch(err => {
        console.log(err);
    });
}

export const getSingleNote = (id, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'note-details?id=' + id).then(res => {
        callback(res.data.data);
    }).catch(err => {
        console.log(err)
    });
}

export const downloadNote = async (name, token) => {
    try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + 'user/download/' + name, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            responseType:'blob'
        });
        if (response.request.status !== 200) {
            throw new Error('Network response was not ok');
        }
        const url = window.URL.createObjectURL(response.data);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
    } catch (error) {
        console.error('Error downloading file:', error);
    }
}

export const getSelectedNote = (token, id, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'user/edit-note?id=' + id, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        callback(res.data.data);
    }).catch(err => {
        console.log(err)
    });
}

export const upload = (data, token, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/upload', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const editNote = (data, token, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/edit-note', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const deleteNote = (data, token, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/delete-note', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const adminDeleteNote = (data, token, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'admin/delete-note', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        errorHandler({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}