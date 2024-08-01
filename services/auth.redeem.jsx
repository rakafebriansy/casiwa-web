import axios from "axios";

export const redeem = (data, token, callback) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'user/redeem', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        console.log(res)
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const getUnpaidRedeem = (token, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'admin/redeem/unpaid', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const redeemUser = (data, token, callback) => {
    axios.post(import.meta.env.VITE_BASE_URL + 'admin/redeem', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        console.log(res)
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const getAdminRedeemHistories = (token, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'admin/redeem/history', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}

export const getRedeemHistories = (token, callback) => {
    axios.get(import.meta.env.VITE_BASE_URL + 'redeem/history', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }).then(res => {
        callback(res.data);
    }).catch(res => {
        callback({
            status: false,
            message:Object.values(res.response.data.errors)[0][0]
        });
    });
}