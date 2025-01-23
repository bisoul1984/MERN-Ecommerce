import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        try {
            setLoading(true);
            console.log('Sending registration request with:', {
                name: formData.name,
                email: formData.email
            });

            const response = await axios.post(
                `${API_BASE_URL}/api/users/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            console.log('Registration response:', response.data);

            if (response.data) {
                // Registration successful
                setLoading(false);
                // Store the token
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }
                // Show success message
                alert('Registration successful! Please login.');
                // Redirect to login page
                navigate('/login');
            }
        } catch (err) {
            setLoading(false);
            console.error('Registration error:', err);
            
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('Error response:', err.response.data);
                setError(err.response.data.message || 'Registration failed. Please check your details.');
            } else if (err.request) {
                // The request was made but no response was received
                console.error('No response received:', err.request);
                setError('Unable to connect to the server. Please check your internet connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up request:', err.message);
                setError('An unexpected error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="register-page">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <div className="register-card">
                            <div className="register-header">
                                <h1>Create Account</h1>
                                <p>Join our community of tech enthusiasts</p>
                            </div>
                            
                            {error && (
                                <Alert variant="danger" className="mb-3">
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                        required
                                    />
                                </Form.Group>

                                <Button 
                                    type="submit" 
                                    className="register-btn" 
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </Form>

                            <div className="register-footer">
                                <p>Already have an account? <Link to="/login">Login here</Link></p>
                            </div>

                            <div className="terms-text">
                                <p>
                                    By creating an account, you agree to our{' '}
                                    <Link to="/terms">Terms of Service</Link> and{' '}
                                    <Link to="/privacy">Privacy Policy</Link>
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Register; 