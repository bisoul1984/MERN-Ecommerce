import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import { useSearchParams } from 'react-router-dom';

import { fetchProducts } from '../features/productSlice';

import ProductPreview from '../components/ProductPreview';

import './Products.css';
<<<<<<< HEAD
import api from '../services/api';
=======

import api from '../services/api';


>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422

function Products() {

    const dispatch = useDispatch();

    const { items: products, status, error } = useSelector(state => state.products);

    const [searchParams] = useSearchParams();

    const category = searchParams.get('category');



    useEffect(() => {
<<<<<<< HEAD
        const fetchData = async () => {
            if (status === 'idle') {
                try {
                    const result = await dispatch(fetchProducts()).unwrap();
                    console.log('Products fetched successfully:', result);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
        };
        fetchData();
=======

        if (status === 'idle') {

            dispatch(fetchProducts());

        }

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
    }, [status, dispatch]);



    const handleAddToCart = async (productId) => {

        try {

            const token = localStorage.getItem('token');

            const storedUser = JSON.parse(localStorage.getItem('user'));



            if (!token || !storedUser) {

                alert('Please login to add items to cart');

                return;

            }

<<<<<<< HEAD
            const response = await api.post('/api/users/add-to-cart', {
                userId: storedUser._id,
                productId: productId
            });
=======


            const response = await api.post('/api/users/add-to-cart', {

                userId: storedUser._id,

                productId: productId

            });


>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422

            if (response.data) {

                // Update both user and cart in Redux

                const updatedUser = { ...storedUser, cart: response.data };

                localStorage.setItem('user', JSON.stringify(updatedUser));

                dispatch({ type: 'USER_LOGIN', payload: updatedUser });

                // Optionally dispatch a separate cart update

                dispatch({ type: 'UPDATE_CART', payload: response.data });
<<<<<<< HEAD
                alert('Product added to cart successfully!');
=======

                alert('Product added to cart successfully!');

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
            }

        } catch (error) {

            console.error('Add to cart error:', error);

            alert(error.response?.data?.message || 'Failed to add item to cart');

        }

    };



    if (status === 'loading') {

        return (

            <Container>

                <div className="loading">Loading products...</div>

            </Container>

        );

    }



    if (status === 'failed') {

        return (

            <Container>

                <div className="error">Error: {error}</div>

            </Container>

        );

    }



    if (!Array.isArray(products) || products.length === 0) {

        return (

            <Container>

                <div className="no-products">No products found.</div>

            </Container>

        );

    }



    // Filter products by category if category parameter exists

    const filteredProducts = category

        ? products.filter(product => product.category.toLowerCase() === category.toLowerCase())

        : products;



    return (

        <Container>

            <h2 className="text-center mb-4">

                {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}

            </h2>

            {filteredProducts.length === 0 ? (

                <div className="no-products">No products found in this category.</div>

            ) : (

                <Row>

                    {filteredProducts.map(product => (

                        <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
<<<<<<< HEAD
                            <ProductPreview 
                                {...product} 
                                onAddToCart={() => handleAddToCart(product._id)}
                            />
=======

                            <ProductPreview 

                                {...product} 

                                onAddToCart={() => handleAddToCart(product._id)}

                            />

>>>>>>> 30fdc920c19ed9ed3592dc8c7afa42594bbe4422
                        </Col>

                    ))}

                </Row>

            )}

        </Container>

    );

}



export default Products; 
