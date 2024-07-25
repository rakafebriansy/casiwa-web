export const getPaymentToken = (token, callback) => {
    axios.get(baseURL + 'payment-token', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(err => {
        console.error(err);
    });
}