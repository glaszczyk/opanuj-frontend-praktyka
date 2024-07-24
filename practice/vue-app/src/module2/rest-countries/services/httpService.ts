import axios, { isAxiosError } from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1/';
const axiosInstance = axios.create({ baseURL: BASE_URL });

const getAll = async () => {
  try {
    const response = await axiosInstance.get('all');
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error('Failed to fetch countries with Axios error:', error);
      throw error; // or return [];
    }
    console.error('Failed to fetch countries with general error:', error);
    throw error; // or return [];}
  }
};

export const httpService = {
  getAll
};