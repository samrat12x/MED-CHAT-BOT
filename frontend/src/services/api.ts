// src/services/api.ts
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000/api';

export const fetchData = async (): Promise<{ message: string }> => {
    try {
        const response = await axios.get<{ message: string }>(`${API_URL}/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
