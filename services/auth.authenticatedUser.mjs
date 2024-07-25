import axios from "axios";
import { baseURL } from "./env.mjs";

export const authenticatedUser = (token, callback, errorHandler = () => {}, finallyHandler = () => {}) => {
  axios.get(baseURL + 'user',{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(callback).catch(errorHandler).finally(finallyHandler);
}

export const hasDocumentUser = (token, id, callback, errorHandler = () => {}, finallyHandler = () => {}) => {
  axios.get(baseURL + 'user/is-bought?id=' + id,{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(callback).catch(errorHandler).finally(finallyHandler);
}


