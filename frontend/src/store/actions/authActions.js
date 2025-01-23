export const checkAuthState = () => (dispatch) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
        dispatch({ type: 'USER_LOGIN', payload: JSON.parse(user) });
    }
}; 