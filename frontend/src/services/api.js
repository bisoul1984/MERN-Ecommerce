import axios from 'axios';

<<<<<<< HEAD
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
            baseURL: config.baseURL,
            fullUrl: `${config.baseURL}${config.url}`,
            headers: config.headers
        });
        
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add CORS headers
        config.headers['Access-Control-Allow-Credentials'] = true;
        
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

// Add response interceptor for debugging
api.interceptors.response.use(
    (response) => {
        console.log('API Response:', {
            status: response.status,
            data: response.data,
            headers: response.headers
        });
        return response;
    },
    (error) => {
        console.error('API Response Error:', {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            config: error.config
        });
        return Promise.reject(error);
    }
);

export default api; 
=======


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
>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
