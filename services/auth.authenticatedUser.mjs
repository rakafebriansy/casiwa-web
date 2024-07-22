import axios from "axios";
import { baseURL } from "./env.mjs";

export const authenticatedUser = (token, callback, errorHandler = () => {}, finallyHandler = () => {}) => {
  axios.get(baseURL + '/user',{
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(callback).catch(errorHandler).finally(finallyHandler);
}


