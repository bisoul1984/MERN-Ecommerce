import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './ProductDetail.css';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const product = useSelector(state => 
        state.products.items.find(p => p._id === id)
    );

    const handleAddToCart = async () => {
        try {
            const token = localStorage.getItem('token');
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (!storedUser || !token) {
                alert('Please login to add items to cart');
                navigate('/login');
                return;
            }

            const response = await axios.post(
                'http://localhost:8080/api/users/add-to-cart',
                {
                    userId: storedUser._id,
                    productId: id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data) {
                const updatedUser = { ...storedUser, cart: response.data };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                dispatch({ type: 'USER_LOGIN', payload: updatedUser });
                dispatch({ type: 'UPDATE_CART', payload: response.data });
                alert('Item added to cart!');
            }
        } catch (error) {
            console.error('Add to cart error:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            alert(error.response?.data?.message || 'Failed to add item to cart');
        }
    };

    if (!product) {
        return (
            <Container>
                <div>Product not found</div>
            </Container>
        );
    }

    return (
        <Container className="product-detail-container">
            <Row>
                <Col md={6}>
                    <div className="product-image-container">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-image"
                        />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        <p className="product-category">{product.category}</p>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <Button 
                            variant="primary" 
                            size="lg"
                            onClick={handleAddToCart}
                            className="add-to-cart-btn"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetail; 