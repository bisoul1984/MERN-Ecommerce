const initialState = localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user')) 
    : null;

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return action.payload;
            
        case 'USER_LOGOUT':
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return null;
            
        case 'UPDATE_CART':
            const updatedState = {
                ...state,
                cart: action.payload
            };
            localStorage.setItem('user', JSON.stringify(updatedState));
            return updatedState;
            
        default:
            return state;
    }
} 