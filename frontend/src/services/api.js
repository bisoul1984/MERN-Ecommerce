import axios from 'axios';



// Create axios instance with the correct base URL

const api = axios.create({

    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8081',

    withCredentials: true,

    headers: {

        'Content-Type': 'application/json'

    }

});



// Add request interceptor for debugging

api.interceptors.request.use(

    (config) => {

        // Log the request details

        console.log('API Request:', {

            url: config.url,

            method: config.method,

            baseURL: config.baseURL,

            headers: config.headers

        });



        const token = localStorage.getItem('token');

        if (token) {

            config.headers.Authorization = `Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        console.error('Request interceptor error:', error);

        return Promise.reject(error);

    }

);



// Add response interceptor for debugging

api.interceptors.response.use(

    (response) => {

        console.log('API Response:', {

            url: response.config.url,

            status: response.status,

            data: response.data

        });

        return response;

    },

    (error) => {

        console.error('API Error:', {

            url: error.config?.url,

            method: error.config?.method,

            status: error.response?.status,

            data: error.response?.data,

            message: error.message

        });

        return Promise.reject(error);

    }

);



export default api;
