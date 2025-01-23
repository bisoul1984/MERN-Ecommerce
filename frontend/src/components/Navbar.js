import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container, Button } from 'react-bootstrap';
import './Navbar.css';
import { useSelector, useDispatch } from 'react-redux';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = localStorage.getItem('token');
    const cartCount = useSelector(state => state.user?.cart?.count || 0);

    const handleLogout = () => {
        dispatch({ type: 'USER_LOGOUT' });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <BootstrapNavbar.Brand as={Link} to="/">E-Shop</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/categories">Categories</Nav.Link>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                        <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/cart" className="cart-link">
                                    Cart
                                    {cartCount > 0 && (
                                        <span className="cart-count">{cartCount}</span>
                                    )}
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Button 
                                    variant="outline-light" 
                                    size="sm" 
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
}

export default Navbar; 