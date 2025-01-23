import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import './Layout.css';
import AuthDebug from './AuthDebug';
import ScrollToTop from './ScrollToTop';

function Layout({ children }) {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="layout">
            <ScrollToTop />
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
            {process.env.NODE_ENV === 'development' && <AuthDebug />}
        </div>
    );
}

export default Layout; 