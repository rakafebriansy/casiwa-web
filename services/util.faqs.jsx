import axios from "axios";

export const getFaqs = (callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'faqs').then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}