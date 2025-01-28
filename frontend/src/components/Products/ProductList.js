import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import './ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const url = selectedCategory === 'all' 
                ? '/api/products'
                : `/api/products?category=${selectedCategory}`;
                
            const response = await api.get(url);
            setProducts(response.data);
            
            // Get unique categories
            const uniqueCategories = [...new Set(response.data.map(product => product.category))];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error('Failed to fetch products:', error);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const handleAddToCart = async (productId) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) {
                // Redirect to login if not logged in
                window.location.href = '/login';
                return;
            }

            await api.post('/api/users/add-to-cart', {
                userId: user._id,
                productId: productId
            });

            // Show success message
            alert('Product added to cart successfully!');
        } catch (error) {
            console.error('Failed to add to cart:', error);
            alert('Failed to add product to cart. Please try again.');
        }
    };

    if (loading) return <div className="loading">Loading products...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="product-list-container">
            <div className="category-filter">
                <button 
                    className={selectedCategory === 'all' ? 'active' : ''}
                    onClick={() => handleCategoryChange('all')}
                >
                    All Products
                </button>
                {categories.map(category => (
                    <button
                        key={category}
                        className={selectedCategory === category ? 'active' : ''}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="products-grid">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="product-image"
                        />
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p className="price">${product.price.toFixed(2)}</p>
                            <p className="category">{product.category}</p>
                            <button 
                                onClick={() => handleAddToCart(product._id)}
                                className="add-to-cart-btn"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList; 