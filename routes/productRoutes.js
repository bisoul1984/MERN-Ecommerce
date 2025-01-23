const router = require('express').Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const User = require('../models/User');
const { getUpdatedUserData } = require('../utils/userUtils');

// Admin routes - Put these FIRST
router.post('/admin/clear-all', async (req, res) => {
    try {
        await Product.deleteMany({});
        res.json({ message: "All products deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/admin/init-samples', async (req, res) => {
    try {
        // First clear existing products
        await Product.deleteMany({});
        
        const sampleProducts = [
            {
                name: "MacBook Pro",
                description: "Latest model with M1 chip",
                price: 1299.99,
                category: "laptops",
                pictures: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8"],
                stock: 10
            },
            {
                name: "iPhone 13",
                description: "Latest iPhone model",
                price: 999.99,
                category: "phones",
                pictures: ["https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5"],
                stock: 15
            }
        ];

        const savedProducts = await Product.insertMany(sampleProducts);
        res.json({ 
            message: "Sample products added successfully",
            products: savedProducts
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const sort = req.query.sort || '-createdAt';
        const products = await Product.find().sort(sort);
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Cart routes
router.post('/add-to-cart', async (req, res) => {
    // ... existing code ...
});

router.post('/remove-from-cart', async (req, res) => {
    // ... existing code ...
});

router.post('/increase-cart', async (req, res) => {
    // ... existing code ...
});

router.post('/decrease-cart', async (req, res) => {
    // ... existing code ...
});

// IMPORTANT: Put ID routes LAST
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    console.log("Received request for product ID:", id);
    
    // Validate MongoDB ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: "Invalid product ID format" });
    }

    try {
        const product = await Product.findById(id);
        console.log("Found product:", product);
        
        if (!product) {
            return res.status(404).json({ 
                message: "Product not found",
                requestedId: id
            });
        }

        res.status(200).json(product);
    } catch (e) {
        console.error("Error in product route:", e);
        res.status(500).json({ 
            message: "Error retrieving product",
            error: e.message,
            requestedId: id
        });
    }
});

router.patch('/:id', async (req, res) => {
    // ... existing code ...
});

router.delete('/:id', async (req, res) => {
    // ... existing code ...
});

module.exports = router; 