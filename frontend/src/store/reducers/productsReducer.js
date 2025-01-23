const initialState = {
    items: [],
    loading: false,
    error: null
};

export default function productsReducer(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_PRODUCTS_START':
            return {
                ...state,
                loading: true,
                error: null
            };
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                items: action.payload
            };
        case 'FETCH_PRODUCTS_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
} 