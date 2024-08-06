// src/api.ts
import axios from 'axios';
import { SelectOption } from '../Types/types';

const API_URL = 'http://localhost:3006/options';

// Function to fetch options
export const fetchOptions = async (): Promise<SelectOption[]> => {
    try {
        const response = await axios.get<SelectOption[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching options:', error);
        throw new Error('Failed to fetch options');
    }
};
