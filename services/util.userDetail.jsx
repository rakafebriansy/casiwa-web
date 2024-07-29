import axios from "axios";

export const getAllUserDetails = (prefix,callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + prefix).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}
export const updateUserDetails = (data, prefix, callback) => {

}