
import axios from 'axios';

const API_URL = '/api/users';

export const userService = {
    getAll: async () => {
        const response = await axios.get(API_URL);
        return response.data?.data || [];
    },

    create: async (userData) => {
        // Axios tự động phát hiện FormData và set header 'Content-Type': 'multipart/form-data'
        return await axios.post(API_URL, userData);
    },

    delete: async (id) => {
        return await axios.delete(`${API_URL}/${id}`);
    }
};