import axios from 'axios';



const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081';



const api = axios.create({

    baseURL: API_BASE_URL,

    withCredentials: true,

    headers: {

        'Content-Type': 'application/json'

    }

});



// Add request interceptor for debugging

api.interceptors.request.use(

    (config) => {

        console.log('API Request:', {

            url: config.url,

            method: config.method,

            baseURL: config.baseURL

        });

        const token = localStorage.getItem('token');

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);



export default api; 
