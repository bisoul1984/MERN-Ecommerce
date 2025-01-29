import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://mern-ecommerce-gilt-delta.vercel.app';

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Enhanced request interceptor
api.interceptors.request.use(
    (config) => {
        console.log('%c API Request:', 'color: blue; font-weight: bold', {
            url: config.url,
            method: config.method,
            baseURL: config.baseURL,
            fullUrl: `${config.baseURL}${config.url}`,
            headers: config.headers
        });
        return config;
    },
    (error) => {
        console.error('%c API Request Error:', 'color: red; font-weight: bold', error);
        return Promise.reject(error);
    }
);

// Enhanced response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('%c API Response:', 'color: green; font-weight: bold', {
            status: response.status,
            data: response.data,
            url: response.config.url
        });
        return response;
    },
    (error) => {
        console.error('%c API Error:', 'color: red; font-weight: bold', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url
        });
        return Promise.reject(error);
    }
);

export default api;
