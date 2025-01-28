import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';  // Use api service instead of axios

// Create async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            console.log('Fetching products from:', process.env.REACT_APP_API_URL);
            const response = await api.get('/api/products');  // Use api service
            console.log('Products response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Fetch products error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status,
                url: error.config?.url
            });
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
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