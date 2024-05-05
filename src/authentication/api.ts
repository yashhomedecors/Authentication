import axios from 'axios';

const api = axios.create({
    baseURL: 'https://cors-zqq2.onrender.com/',
});

// Request interceptor to add the authorization header
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
