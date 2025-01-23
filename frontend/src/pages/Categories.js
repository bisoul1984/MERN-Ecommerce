import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaLaptop, FaMobileAlt, FaTabletAlt } from 'react-icons/fa';
import './Categories.css';

const categories = [
    {
        id: 'laptops',
        name: 'Laptops',
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp-spacegray-select-202206?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1664497359481',
        description: 'Powerful laptops for work and play',
        icon: <FaLaptop />,
        color: '#2c3e50'
    },
    {
        id: 'phones',
        name: 'Phones',
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708',
        description: 'Latest smartphones and accessories',
        icon: <FaMobileAlt />,
        color: '#2c3e50'
    },
    {
        id: 'tablets',
        name: 'Tablets',
        image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=940&hei=1112&fmt=p-jpg&qlt=95&.v=1664411207213',
        description: 'Versatile tablets for creativity and entertainment',
        icon: <FaTabletAlt />,
        color: '#2c3e50'
    }
];

function Categories() {
    return (
        <div className="categories-page">
            <div className="category-hero">
                <Container>
                    <h1>Our Categories</h1>
                    <p>Discover our wide range of products</p>
                </Container>
            </div>
            <Container>
                <Row className="category-grid">
                    {categories.map(category => (
                        <Col key={category.id} md={4} className="mb-4">
                            <Link to={`/products?category=${category.id}`} className="category-link">
                                <div className="category-card" style={{ '--category-color': category.color }}>
                                    <div className="category-icon">
                                        {category.icon}
                                    </div>
                                    <div className="category-image-container">
                                        <img 
                                            src={category.image} 
                                            alt={category.name}
                                            className="category-image"
                                        />
                                    </div>
                                    <div className="category-content">
                                        <h3>{category.name}</h3>
                                        <p>{category.description}</p>
                                        <span className="view-more">View Products →</span>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default Categories; 