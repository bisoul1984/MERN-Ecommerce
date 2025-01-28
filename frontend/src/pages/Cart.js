/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';

import { Container, Row, Col, Table, Button } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import './Cart.css';
<<<<<<< HEAD
import api from '../services/api';  // Replace axios with api service
=======

import api from '../services/api';  // Replace axios with api service


>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422

function Cart() {

    const user = useSelector(state => state.user);

    const dispatch = useDispatch();

    const navigate = useNavigate();



    const handleRemoveFromCart = async (productId) => {

        let storedUser;

        try {

            const token = localStorage.getItem('token');

            storedUser = JSON.parse(localStorage.getItem('user'));



            console.log('Cart before removal:', storedUser.cart);

            console.log('Attempting to remove product:', productId);

            console.log('Available cart items:', Object.keys(storedUser.cart?.items || {}));



            if (!token || !storedUser) {

                console.error('Missing auth data:', { token: !!token, user: !!storedUser });

                alert('Please login again');

                navigate('/login');

                return;

            }

<<<<<<< HEAD
            const response = await api.post('/api/users/remove-from-cart', {
                userId: storedUser._id,
                productId
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
=======


            const response = await api.delete(

                '/users/remove-from-cart',

                {

                    headers: {

                        'Authorization': `Bearer ${token}`,

                        'Content-Type': 'application/json'

                    },

                    data: {

                        userId: storedUser._id,

                        productId

                    }

                }

            );
>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422



            console.log('Remove from cart response:', response.data);



            if (response.data) {

                // Update both localStorage and Redux store

                const updatedUser = { ...storedUser, cart: response.data };

                localStorage.setItem('user', JSON.stringify(updatedUser));

                dispatch({ type: 'USER_LOGIN', payload: updatedUser });
<<<<<<< HEAD
                
                // Log success
                console.log('Cart updated successfully:', response.data);
=======

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
            } else {

                throw new Error('Invalid response from server');

            }



        } catch (error) {

            console.error('Error removing from cart:', {

                message: error.message,

                response: error.response?.data,

                status: error.response?.status,
<<<<<<< HEAD
                cartItems: storedUser?.cart?.items,
                url: error.config?.url,
                method: error.config?.method
=======

                cartItems: storedUser?.cart?.items

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
            });

            

            if (error.response?.status === 401) {

                alert('Session expired. Please login again.');

                navigate('/login');

            } else {

                alert(error.response?.data?.message || 'Failed to remove item from cart');

            }

        }

    };



    if (!user) {

        return (

            <Container className="cart-page">

                <div className="text-center py-5">

                    <h2>Please login to view your cart</h2>

                    <Link to="/login" className="btn btn-primary mt-3">Login</Link>

                </div>

            </Container>

        );

    }



    const cartItems = Object.entries(user.cart?.items || {}).map(([productId, item]) => ({

        ...item,

        productId

    }));



    return (

        <Container className="cart-page">

            <h2 className="cart-title">Shopping Cart</h2>

            {cartItems.length === 0 ? (

                <div className="text-center py-5">

                    <h3>Your cart is empty</h3>

                    <Link to="/products" className="btn btn-primary mt-3">

                        Continue Shopping

                    </Link>

                </div>

            ) : (

                <Row>

                    <Col md={8}>

                        <Table responsive className="cart-table">

                            <tbody>

                                {cartItems.map((item) => (

                                    <tr key={item.productId}>

                                        <td>

                                            <div className="cart-product">

                                                <img

                                                    src={item.product.image}

                                                    alt={item.product.name}

                                                    className="cart-product-image"

                                                />

                                                <div className="cart-product-info">

                                                    <h5>{item.product.name}</h5>

                                                    <p className="text-muted">

                                                        {item.product.category}

                                                    </p>

                                                </div>

                                            </div>

                                        </td>

                                        <td>${item.product.price.toFixed(2)}</td>

                                        <td>{item.quantity}</td>

                                        <td>

                                            <Button

                                                variant="danger"

                                                size="sm"

                                                onClick={() => handleRemoveFromCart(item.productId)}

                                            >

                                                Remove

                                            </Button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </Table>

                    </Col>

                    <Col md={4}>

                        <div className="cart-summary">

                            <h4>Cart Summary</h4>

                            <div className="d-flex justify-content-between mb-2">

                                <span>Items:</span>

                                <span>{user.cart?.count || 0}</span>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span>Total:</span>

                                <span>${(user.cart?.total || 0).toFixed(2)}</span>

                            </div>

                            <Button 

                                variant="primary"

                                size="lg"

                                className="w-100"

                                onClick={() => navigate('/checkout')}

                            >

                                Proceed to Checkout

                            </Button>

                        </div>

                    </Col>

                </Row>

            )}

        </Container>

    );

}



export default Cart; 
