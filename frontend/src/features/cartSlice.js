export const removeFromCart = createAsyncThunk(
    'cart/removeFromCart',
    async ({ userId, productId }, { rejectWithValue }) => {
        try {
            const response = await api.post('/api/users/remove-from-cart', {
                userId,
                productId
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove item');
        }
    }
); 