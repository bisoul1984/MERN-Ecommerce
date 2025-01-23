const authReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                user: action.payload
            };
        case 'USER_LOGOUT':
            return {
                ...state,
                user: null
            };
        case 'UPDATE_CART':
            return {
                ...state,
                user: {
                    ...state.user,
                    cart: action.payload
                }
            };
        default:
            return state;
    }
};

export default authReducer; 