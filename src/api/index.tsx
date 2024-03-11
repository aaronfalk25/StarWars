import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'https://swapi.py4e.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;