import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
<<<<<<< HEAD
import api from '../services/api';  // Use api service instead of axios
=======

import api from '../services/api';  // Use api service instead of axios


>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422

// Create async thunk for fetching products

export const fetchProducts = createAsyncThunk(

    'products/fetchProducts',

    async (_, { rejectWithValue }) => {

        try {
<<<<<<< HEAD
            console.log('Fetching products from:', process.env.REACT_APP_API_URL);
            const response = await api.get('/api/products');  // Use api service
            console.log('Products response:', response.data);
=======

            console.log('Fetching products from:', process.env.REACT_APP_API_URL);

            const response = await api.get('/api/products');  // Use api service

            console.log('Products response:', response.data);

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
            return response.data;

        } catch (error) {
<<<<<<< HEAD
            console.error('Fetch products error:', {
=======

            console.error('Fetch products error:', {

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
                message: error.message,

                response: error.response?.data,
<<<<<<< HEAD
                status: error.response?.status,
                url: error.config?.url
            });
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
=======

                status: error.response?.status,

                url: error.config?.url

            });

            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
        }

    }

);



// Create the products slice

const productSlice = createSlice({

    name: 'products',

    initialState: {

        items: [],

        status: 'idle',

        error: null

    },

    reducers: {},

    extraReducers: (builder) => {

        builder

            .addCase(fetchProducts.pending, (state) => {

                state.status = 'loading';

                state.error = null;

            })

            .addCase(fetchProducts.fulfilled, (state, action) => {

                state.status = 'succeeded';

                state.items = action.payload;

                state.error = null;

            })

            .addCase(fetchProducts.rejected, (state, action) => {

                state.status = 'failed';

                state.error = action.payload;

            });

    }

});



export default productSlice.reducer; 
