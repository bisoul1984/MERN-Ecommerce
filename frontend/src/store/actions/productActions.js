import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    
    try {
        const { data } = await axios.get('http://localhost:8080/api/products');
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ 
            type: 'FETCH_PRODUCTS_FAIL', 
            payload: error.response?.data?.message || 'Failed to fetch products'
        });
    }
}; 