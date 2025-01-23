import React from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import './Error.css';

function Error() {
    return (
        <Layout>
            <div className="error-page">
                <div className="error-content">
                    <h1>404 - Page Not Found</h1>
                    <p>The page you are looking for doesn't exist or has been moved.</p>
                    <Link to="/" className="back-home">
                        Back to Home
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default Error; 