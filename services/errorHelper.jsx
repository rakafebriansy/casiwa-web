export const getErrorMessage = (error) => {
    if (error && error.response) {
        const data = error.response.data;
        if (data) {
            // Check if errors is defined and is an object
            if (data.errors && typeof data.errors === 'object') {
                const values = Object.values(data.errors);
                if (values.length > 0) {
                    const firstVal = values[0];
                    if (Array.isArray(firstVal) && firstVal.length > 0) {
                        return firstVal[0];
                    }
                    return String(firstVal);
                }
            }
            if (data.message) {
                return data.message;
            }
        }
        if (error.response.statusText) {
            return error.response.statusText;
        }
        if (error.response.status) {
            return `Error status: ${error.response.status}`;
        }
    }
    return error?.message || "An unexpected error occurred. Please try again.";
};
