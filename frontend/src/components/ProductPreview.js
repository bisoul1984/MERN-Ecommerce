import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import './ProductPreview.css';
import { useDispatch } from 'react-redux';

function ProductPreview({ _id, name, description, price, image, category, rating, onAddToCart }) {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        if (onAddToCart) {
            onAddToCart();
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="product-preview"
        >
            <Card className="h-100">
                <Link to={`/product/${_id}`} className="product-link">
                    <div className="image-container">
                        <Card.Img variant="top" src={image} className="product-image" />
                    </div>
                    <Card.Body>
                        <Card.Title className="product-title">{name}</Card.Title>
                        <Card.Text className="product-category">{category}</Card.Text>
                        <Card.Text className="product-description">
                            {description?.substring(0, 100)}...
                        </Card.Text>
                        <div className="product-details">
                            <span className="product-price">${price?.toFixed(2)}</span>
                            <span className="product-rating">
                                <FaStar className="star-icon" />
                                {rating}
                            </span>
                        </div>
                    </Card.Body>
                </Link>
                <Card.Footer className="text-center">
                    <Button 
                        variant="primary" 
                        onClick={handleAddToCart}
                        className="add-to-cart-btn"
                    >
                        <FaShoppingCart className="cart-icon" />
                        Add to Cart
                    </Button>
                </Card.Footer>
            </Card>
        </motion.div>
    );
}

export default ProductPreview;
