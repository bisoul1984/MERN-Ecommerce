import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './ProductDetail.css';
import { getFallbackImage } from '../utils/imageUtils';

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imageError, setImageError] = useState(false);
    const product = useSelector(state => 
        state.products.items.find(p => p._id === id)
    );

    const handleImageError = () => {
        console.log(`Image failed to load for ${product.name}, using fallback`);
        setImageError(true);
    };

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
                'http://localhost:8081/api/users/add-to-cart',
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

    const imageStyle = product?.name.includes('iPhone') ? 
        { objectFit: 'cover', objectPosition: 'center 20%' } : 
        {};

    if (!product) {
        return (
            <Container>
                <div className="text-center py-5">
                    <h2>Product not found</h2>
                </div>
            </Container>
        );
    }

    return (
        <Container className="product-detail-container">
            <Row>
                <Col md={6}>
                    <div className="product-image-container">
                        <img 
                            src={imageError ? getFallbackImage(product.category, product.name) : product.image}
                            alt={product.name}
                            className="product-image"
                            onError={handleImageError}
                            loading="lazy"
                            style={imageStyle}
                        />
                    </div>
                </Col>
                <Col md={6}>
                    <div className="product-info">
                        <h1>{product.name}</h1>
                        <p className="product-category">{product.category}</p>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">${product.price.toFixed(2)}</p>
                        <button 
                            className="add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={!product}
                        >
                            Add to Cart
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ProductDetail; 