import axios from 'axios';



const API_BASE_URL = process.env.NODE_ENV === 'production'

    ? 'https://mern-ecommerce-mja8uz6tc-bisrats-projects-b32b673c.vercel.app'

    : 'http://localhost:3001';



const api = axios.create({

    baseURL: API_BASE_URL,

    withCredentials: true,

    headers: {

        'Content-Type': 'application/json'

    }

});



// Add a request interceptor to handle tokens

api.interceptors.request.use(

    (config) => {

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
