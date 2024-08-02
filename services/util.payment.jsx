import axios from "axios";

export const getPaymentToken = (callback, token, id, price) => {
    const params = price ? 'user/payment-token?id=' + id + '&price=' + price : 'user/payment-token';
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

export const doPayment = async (token, data) => {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + 'user/payment', data, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (err) {
        throw {
            status: false,
            message: Object.values(err.response.data.errors)[0][0]
        };
    }
}

export const getProveOfPayment = (token, id, callback, errorHandler = () => {}) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'user/is-paid?id=' + id,{
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        callback(res.data);
      }).catch(errorHandler);
}
export const updateFreeDownload = (token, data, callback, errorHandler) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/free-download', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
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