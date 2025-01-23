import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const { cart } = useSelector(state => state.user || {});
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zipCode: '',
        country: ''
    });

    if (!cart?.items || Object.keys(cart?.items || {}).length === 0) {
        return (
            <Container className="py-5">
                <div className="text-center">
                    <h2>Your cart is empty</h2>
                    <Button 
                        variant="primary" 
                        onClick={() => navigate('/products')}
                        className="mt-3"
                    >
                        Continue Shopping
                    </Button>
                </div>
            </Container>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle checkout logic here
        console.log('Checkout form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container className="checkout-page py-5">
            <h2 className="mb-4">Checkout</h2>
            <Row>
                <Col md={8}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ZIP Code</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="zipCode"
                                        value={formData.zipCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Button type="submit" className="w-100">
                            Place Order
                        </Button>
                    </Form>
                </Col>
                <Col md={4}>
                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-items">
                            {Object.values(cart?.items || {}).map((item) => (
                                <div key={item.product._id} className="summary-item">
                                    <span>{item.product.name} x {item.quantity}</span>
                                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="summary-total">
                            <strong>Total:</strong>
                            <strong>${cart?.total?.toFixed(2) || '0.00'}</strong>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Checkout; 