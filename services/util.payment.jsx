import axios from "axios";

export const getPaymentToken = (callback, token, price) => {
    const params = price ? 'user/payment-token?price=' + price : 'user/payment-token';
    axios.get(import.meta.env.VITE_BASE_URL + params, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data.data);
    }).catch(err => {
        console.error(err);
    });
}

export const doPayment = (token, data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/payment', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    }).then(res => {
        callback(res.data);
    }).catch(err => {
        errorHandler({
            status: false,
            message:Object.values(err.response.data.errors)[0][0]
        });
    });
}
