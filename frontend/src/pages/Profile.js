import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Profile.css';

function Profile() {
    const user = useSelector(state => state.user);

    if (!user) {
        return (
            <Container className="mt-5">
                <h2>Please login to view your profile</h2>
            </Container>
        );
    }

    return (
        <Container className="profile-container my-5">
            <Row>
                <Col md={4}>
                    <Card className="profile-card">
                        <Card.Body>
                            <div className="text-center mb-4">
                                <div className="profile-avatar">
                                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                </div>
                            </div>
                            <h3 className="text-center mb-4">{user.name}</h3>
                            <div className="profile-info">
                                <p><strong>Email:</strong> {user.email}</p>
                                <p><strong>Member Since:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={8}>
                    <Card className="cart-items-card">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4>Cart Items</h4>
                                <Link to="/cart" className="view-cart-btn">View Cart</Link>
                            </div>
                            {user.cart && Object.keys(user.cart.items).length > 0 ? (
                                Object.entries(user.cart.items).map(([productId, item]) => (
                                    <div key={productId} className="cart-item">
                                        <div className="cart-item-details">
                                            <h5>{item.product.name}</h5>
                                            <p className="price">${item.product.price.toFixed(2)}</p>
                                            <p className="quantity">Quantity: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Your cart is empty</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Profile; 