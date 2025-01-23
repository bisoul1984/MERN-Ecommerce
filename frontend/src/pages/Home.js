import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { fetchProducts } from '../features/productSlice';

import ProductPreview from '../components/ProductPreview';

import './Home.css';

// Import icons

import CategoryIcon from '@mui/icons-material/Category';

import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';

import TabletIcon from '@mui/icons-material/Tablet';

import SortIcon from '@mui/icons-material/Sort';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import StarIcon from '@mui/icons-material/Star';

import FilterAltIcon from '@mui/icons-material/FilterAlt';

import ClearAllIcon from '@mui/icons-material/ClearAll';

import { FaFire, FaArrowRight, FaStar } from 'react-icons/fa';



function Home() {

    const dispatch = useDispatch();

    const { items: products, status, error } = useSelector(state => state.products);

    

    console.log('Products state:', { products, status, error });



    // Move all useState hooks to the top

    const [selectedCategory, setSelectedCategory] = useState('all');

    const [sortOrder, setSortOrder] = useState('default');

    const [priceRange, setPriceRange] = useState({ min: '', max: '' });

    const [minRating, setMinRating] = useState(0);



    useEffect(() => {

        if (status === 'idle') {

            dispatch(fetchProducts());

        }

    }, [status, dispatch]);



    // Handle loading state

    if (status === 'loading') {

        return (

            <Container>

                <div className="text-center py-5">

                    <h2>Loading products...</h2>

                </div>

            </Container>

        );

    }



    // Handle error state

    if (status === 'failed') {

        return (

            <Container>

                <div className="text-center py-5">

                    <h2>Error: {typeof error === 'string' ? error : 'Failed to load products'}</h2>

                </div>

            </Container>

        );

    }



    // Filter and sort products

    const getFilteredAndSortedProducts = () => {

        let filteredProducts = [...products];



        // Apply category filter

        if (selectedCategory !== 'all') {

            filteredProducts = filteredProducts.filter(product => 

                product.category.toLowerCase() === selectedCategory.toLowerCase()

            );

        }



        // Apply price range filter

        if (priceRange.min) {

            filteredProducts = filteredProducts.filter(product => 

                product.price >= Number(priceRange.min)

            );

        }

        if (priceRange.max) {

            filteredProducts = filteredProducts.filter(product => 

                product.price <= Number(priceRange.max)

            );

        }



        // Apply rating filter

        if (minRating > 0) {

            filteredProducts = filteredProducts.filter(product => 

                (product.rating || 0) >= minRating

            );

        }



        // Apply sorting

        switch (sortOrder) {

            case 'price-low':

                filteredProducts.sort((a, b) => a.price - b.price);

                break;

            case 'price-high':

                filteredProducts.sort((a, b) => b.price - a.price);

                break;

            case 'rating':

                filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));

                break;

            case 'name-asc':

                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

                break;

            case 'name-desc':

                filteredProducts.sort((a, b) => b.name.localeCompare(a.name));

                break;

            default:

                break;

        }



        return filteredProducts;

    };



    const handleClearFilters = () => {

        setSelectedCategory('all');

        setSortOrder('default');

        setPriceRange({ min: '', max: '' });

        setMinRating(0);

    };



    const getFeaturedProducts = () => {

        return getFilteredAndSortedProducts().slice(0, 4);

    };



    const shortenProductName = (name) => {

        // Mapping of long names to shorter versions

        const nameMap = {

            'MacBook Pro M2': 'MacBook Pro',

            'MacBook Air M2': 'MacBook Air',

            'iPhone 15 Pro': 'iPhone 15',

            'Samsung Galaxy S23 Ultra': 'S23 Ultra',

            'iPad Pro M2': 'iPad Pro',

            'Samsung Galaxy Tab S9': 'Tab S9',

            'MacBook Pro 16': 'MacBook 16',

            'MacBook Pro 14': 'MacBook 14',

            'iPad Pro 11': 'iPad Pro 11'

        };



        return nameMap[name] || name;

    };



    // Separate functions for different sections

    const getBestSellers = () => {

        // Show all products in Best Sellers section

        return products.filter(product => 

            ['iPhone 15 Pro', 'MacBook Pro M2', 'iPad Pro M2', 'MacBook Air M2']

            .includes(product.name)

        );

    };



    const getNewArrivals = () => {

        // Show newest products in New Arrivals section

        return products.filter(product => 

            ['iPad Air', 'MacBook Air M2', 'iPhone 15 Pro']

            .includes(product.name)

        );

    };



    return (

        <div className="home-page">

            {/* Hero Banner */}

            <div className="hero-banner">

                <h1>Welcome to E-Shop</h1>

                <p>Discover the latest in tech</p>

            </div>



            {/* Filtering and Sorting Section */}

            <div className="filter-section">

                <Container>

                    <div className="filter-content">

                        <Row className="align-items-end">

                            {/* Category Filter */}

                            <Col md={3}>

                                <div className="filter-group">

                                    <div className="filter-label">

                                        <CategoryIcon /> Category

                                    </div>

                                    <Form.Select

                                        value={selectedCategory}

                                        onChange={(e) => setSelectedCategory(e.target.value)}

                                        className="filter-select"

                                    >

                                        <option value="all">All Categories</option>

                                        <option value="laptops">Laptops</option>

                                        <option value="phones">Phones</option>

                                        <option value="tablets">Tablets</option>

                                    </Form.Select>

                                </div>

                            </Col>



                            {/* Price Range Filter */}

                            <Col md={4}>

                                <div className="filter-group">

                                    <div className="filter-label">

                                        <AttachMoneyIcon /> Price Range

                                    </div>

                                    <div className="price-range-inputs">

                                        <Form.Control

                                            type="number"

                                            placeholder="Min"

                                            value={priceRange.min}

                                            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}

                                        />

                                        <span>-</span>

                                        <Form.Control

                                            type="number"

                                            placeholder="Max"

                                            value={priceRange.max}

                                            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}

                                        />

                                    </div>

                                </div>

                            </Col>



                            {/* Rating Filter */}

                            <Col md={2}>

                                <div className="filter-group">

                                    <div className="filter-label">

                                        <StarIcon /> Rating

                                    </div>

                                    <Form.Select

                                        value={minRating}

                                        onChange={(e) => setMinRating(Number(e.target.value))}

                                        className="filter-select"

                                    >

                                        <option value={0}>All Ratings</option>

                                        {[4, 3, 2, 1].map(rating => (

                                            <option key={rating} value={rating}>

                                                {rating}+ ⭐

                                            </option>

                                        ))}

                                    </Form.Select>

                                </div>

                            </Col>



                            {/* Sort Order */}

                            <Col md={3}>

                                <div className="filter-group">

                                    <div className="filter-label">

                                        <SortIcon /> Sort By

                                    </div>

                                    <Form.Select

                                        value={sortOrder}

                                        onChange={(e) => setSortOrder(e.target.value)}

                                        className="sort-select"

                                    >

                                        <option value="default">Default</option>

                                        <option value="price-low">Price: Low to High</option>

                                        <option value="price-high">Price: High to Low</option>

                                        <option value="rating">Highest Rated</option>

                                        <option value="name-asc">Name: A to Z</option>

                                        <option value="name-desc">Name: Z to A</option>

                                    </Form.Select>

                                </div>

                            </Col>

                        </Row>

                    </div>

                </Container>

            </div>



            {/* Featured Products */}

            <div className="featured-section">

                <Container>

                    <h2 className="text-center mb-4">Featured Products</h2>

                    <Row xs={2} sm={3} md={4} lg={5} className="g-2">

                        {getFeaturedProducts().map(product => (

                            <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">

                                <ProductPreview {...product} />

                            </Col>

                        ))}

                    </Row>

                </Container>

            </div>



            <div className="best-sellers-section">

                <Container>

                    <div className="best-sellers-header">

                        <div className="section-title">

                            <FaFire className="section-icon" />

                            <h2>Best Sellers</h2>

                        </div>

                        <Link to="/products?category=best-sellers" className="view-all-btn">

                            View All <FaArrowRight />

                        </Link>

                    </div>



                    <Row className="best-sellers-row">

                        {getBestSellers().map(product => (

                            <Col key={product._id} xs={6} sm={6} md={3} className="mb-4">

                                <ProductPreview {...product} />

                            </Col>

                        ))}

                    </Row>

                </Container>

            </div>



            <div className="new-arrivals-section">

                <Container>

                    <div className="section-header">

                        <div className="section-title">

                            <FaStar className="section-icon new-icon" />

                            <h2>New Arrivals</h2>

                        </div>

                        <Link to="/products?category=new" className="view-all-btn">

                            View All <FaArrowRight />

                        </Link>

                    </div>



                    <Row className="new-arrivals-grid">

                        {getNewArrivals().map((product, index) => (

                            <Col key={product._id} xs={6} md={4} className={`new-arrival-item ${index === 0 ? 'featured' : ''}`}>

                                <Link to={`/product/${product._id}`} className="new-arrival-card">

                                    <div className="new-arrival-image">

                                        <img src={product.image} alt={product.name} />

                                        <div className="new-tag">New</div>

                                    </div>

                                    <div className="new-arrival-info">

                                        <h3>{shortenProductName(product.name)}</h3>

                                        <p className="category">{product.category}</p>

                                        <p className="price">${product.price.toFixed(2)}</p>

                                    </div>

                                </Link>

                            </Col>

                        ))}

                    </Row>

                </Container>

            </div>

        </div>

    );

}



export default Home;
