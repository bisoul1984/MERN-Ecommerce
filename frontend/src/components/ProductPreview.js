import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import "./ProductPreview.css";

import { useDispatch } from 'react-redux';

import { getFallbackImage } from '../utils/imageUtils';

import api from '../services/api';



function ProductPreview({ _id, name, price, image, category }) {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [imageError, setImageError] = useState(false);



    const handleImageError = () => {

        console.log(`Image failed to load for ${name}, using fallback`);

        setImageError(true);

    };



    const imageStyle = name.includes('iPhone') ? 

        { objectFit: 'cover', objectPosition: 'center 20%' } : 

        {};



    const handleAddToCart = async () => {

        try {

            const token = localStorage.getItem('token');

            const storedUser = JSON.parse(localStorage.getItem('user'));



            if (!token || !storedUser) {

                alert('Please login to add items to cart');

                navigate('/login');

                return;

            }



            const response = await api.post('/api/users/add-to-cart', {

                userId: storedUser._id,

                productId: _id

            });



            if (response.data) {

                const updatedUser = { ...storedUser, cart: response.data };

                localStorage.setItem('user', JSON.stringify(updatedUser));

                dispatch({ type: 'USER_LOGIN', payload: updatedUser });

                alert('Item added to cart successfully!');

            }



        } catch (error) {

            console.error('Error adding to cart:', error);

            alert(error.response?.data?.message || 'Failed to add item to cart');

        }

    };



    return (

        <div className="product-preview-container">

            <Link to={`/product/${_id}`} className="product-preview">

                <div className="product-image-container">

                    <img 

                        src={imageError ? getFallbackImage(category, name) : image}

                        alt={name}

                        className="product-image"

                        onError={handleImageError}

                        loading="lazy"

                        style={imageStyle}

                    />

                </div>

                <div className="product-info">

                    <h3 className="product-name">{name}</h3>

                    <p className="product-category">{category}</p>

                    <p className="product-price">${price.toFixed(2)}</p>

                </div>

            </Link>

            <button 

                onClick={handleAddToCart} 

                className="add-to-cart-btn"

            >

                Add to Cart

            </button>

        </div>

    );

}



export default ProductPreview;
