const handleRemoveFromCart = async (productId) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user._id) {
            throw new Error('User not authenticated');
        }

        console.log('Attempting to remove item:', {
            productId,
            userId: user._id,
            currentCart: user.cart
        });

        const response = await api.post('/api/users/remove-from-cart', {
            userId: user._id,
            productId: productId
        });

        if (response.data) {
            // Update local storage
            const updatedUser = { ...user, cart: response.data };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            
            // Update Redux state
            dispatch({ type: 'USER_LOGIN', payload: updatedUser });
            dispatch({ type: 'UPDATE_CART', payload: response.data });
            
            console.log('Cart updated successfully:', response.data);
        }
    } catch (error) {
        console.error('Remove from cart error:', {
            error,
            response: error.response?.data,
            status: error.response?.status,
            url: error.config?.url,
            method: error.config?.method
        });
        
        const errorMessage = error.response?.data?.message 
            || error.message 
            || 'Failed to remove item from cart';
            
        alert(`Error: ${errorMessage}`);
    }
}; 