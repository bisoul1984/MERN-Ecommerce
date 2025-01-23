import React from 'react';
import { useSelector } from 'react-redux';

function AuthDebug() {
    const user = useSelector(state => state.user);
    
    return (
        <div style={{ position: 'fixed', bottom: 10, right: 10, background: '#f0f0f0', padding: 10, borderRadius: 5 }}>
            <small>Auth Status: {user ? '✅ Logged in' : '❌ Not logged in'}</small>
        </div>
    );
}

export default AuthDebug; 