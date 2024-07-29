import axios from "axios";

export const authenticatedUser = (token, callback, errorHandler = () => {}, finallyHandler = () => {}) => {
  axios.get(import.meta.env.VITE_BASE_URL + 'user',{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(callback).catch(errorHandler).finally(finallyHandler);
}

export const hasDocumentUser = (token, id, callback, errorHandler = () => {}, finallyHandler = () => {}) => {
  axios.get(import.meta.env.VITE_BASE_URL + 'user/is-bought?id=' + id,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(callback).catch(errorHandler).finally(finallyHandler);
}

export const authenticatedProfile = (token, callback, errorHandler = () => {}, finallyHandler = () => {}) => {
  axios.get(import.meta.env.VITE_BASE_URL + 'user/profile',{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(callback).catch(errorHandler).finally(finallyHandler);
}

export const authenticatedAdmin = (token, callback, errorHandler = () => {}, finallyHandler = () => {}) => {
  axios.get(import.meta.env.VITE_BASE_URL + 'admin',{
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(callback).catch(errorHandler).finally(finallyHandler);
}

