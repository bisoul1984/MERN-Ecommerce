const express = require('express');
const router = express.Router();  // Add this line at the top
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Debug middleware for this router
router.use((req, res, next) => {
    console.log('Product Route:', {
        path: req.path,
        method: req.method,
        mongoState: mongoose.connection.readyState
    });
    next();
});

// Get all products
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/products - Request received');
        console.log('MongoDB Connection State:', mongoose.connection.readyState);
        
        const products = await Product.find({}).lean();
        console.log(`Found ${products.length} products`);
        
        if (!products || products.length === 0) {
            console.log('No products found in database');
            return res.status(404).json({ message: 'No products found' });
        }
        
        res.json(products);
    } catch (error) {
        console.error('Error in GET /api/products:', error);
        res.status(500).json({ 
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
});

// Get single product
router.get('/:id', async (req, res) => {
    try {
        console.log(`GET /api/products/${req.params.id} - Fetching single product`);
        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log(`Product not found with id: ${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log('Product found:', product);
        res.json(product);
    } catch (error) {
        console.error(`Error fetching product ${req.params.id}:`, error);
        res.status(400).json({ message: error.message });
    }
});

// Create product
router.post('/', async (req, res) => {
    try {
        console.log('POST /api/products - Creating new product');
        console.log('Request body:', req.body);
        const product = await Product.create(req.body);
        console.log('Product created:', product);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update product
router.patch('/:id', async (req, res) => {
    try {
        console.log(`PATCH /api/products/${req.params.id} - Updating product`);
        console.log('Update data:', req.body);
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            console.log(`Product not found with id: ${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log('Product updated:', product);
        res.json(product);
    } catch (error) {
        console.error(`Error updating product ${req.params.id}:`, error);
        res.status(400).json({ message: error.message });
    }
});

// Delete product
router.delete('/:id', async (req, res) => {
    try {
        console.log(`DELETE /api/products/${req.params.id} - Deleting product`);
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            console.log(`Product not found with id: ${req.params.id}`);
            return res.status(404).json({ message: "Product not found" });
        }
        console.log('Product deleted successfully');
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(`Error deleting product ${req.params.id}:`, error);
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
