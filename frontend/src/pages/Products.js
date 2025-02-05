import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Container, Row, Col } from 'react-bootstrap';

import { useSearchParams } from 'react-router-dom';

import { fetchProducts } from '../features/productSlice';

import ProductPreview from '../components/ProductPreview';

import './Products.css';
import api from '../services/api';

function Products() {

    const dispatch = useDispatch();

    const { items: products, status, error } = useSelector(state => state.products);

    const [searchParams] = useSearchParams();

    const category = searchParams.get('category');



    useEffect(() => {
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
    }, [status, dispatch]);



    const handleAddToCart = async (productId) => {

        try {

            const token = localStorage.getItem('token');

            const storedUser = JSON.parse(localStorage.getItem('user'));



            if (!token || !storedUser) {

                alert('Please login to add items to cart');

                return;

            }



            const response = await api.post('/api/users/add-to-cart', {

                userId: storedUser._id,

                productId: productId

            });



            if (response.data) {

                const updatedUser = { ...storedUser, cart: response.data };

                localStorage.setItem('user', JSON.stringify(updatedUser));

                dispatch({ type: 'USER_LOGIN', payload: updatedUser });

                alert('Product added to cart successfully!');

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
                            <ProductPreview 
                                {...product} 
                                onAddToCart={() => handleAddToCart(product._id)}
                            />
                        </Col>

                    ))}

                </Row>

            )}

        </Container>

    );

}



export default Products; 
