const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.json(user);
    } catch (e) {
        if (e.code === 11000) return res.status(400).send('Email already exists');
        res.status(400).send(e.message);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt for:', email); // Debug log

        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found:', email); // Debug log
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password for:', email); // Debug log
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { 
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin 
            }, 
            process.env.JWT_SECRET
        );

        console.log('Login successful for:', email); // Debug log

        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                cart: user.cart,
            }
        });
    } catch (error) {
        console.error('Login error:', error); // Debug log
        res.status(500).json({ message: "Login failed: " + error.message });
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({ isAdmin: false }).select('-password');
        res.json(users);
    } catch (e) {
        res.status(400).send(e.message);
    }
});

// Create admin
router.post('/create-admin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingAdmin = await User.findOne({ email, isAdmin: true });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = await User.create({
            name: "Admin User",
            email,
            password,
            isAdmin: true
        });

        res.json(admin);
    } catch (e) {
        res.status(400).json(e.message);
    }
});

// Register route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Create new user
        const user = await User.create({
            name,
            email,
            password // Password will be hashed by the User model pre-save hook
        });

        // Create JWT token
        const token = jwt.sign(
            { 
                _id: user._id,
                email: user.email,
                isAdmin: user.isAdmin 
            }, 
            process.env.JWT_SECRET
        );

        // Send response
        res.status(201).json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            message: error.code === 11000 
                ? "Email already exists" 
                : "Registration failed. Please try again." 
        });
    }
});

// Add to cart
router.post('/add-to-cart', auth, async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log('Add to cart request:', { userId, productId });

        // Verify the user is modifying their own cart
        if (userId !== req.user._id.toString()) {
            return res.status(403).json({ message: "Not authorized to modify this cart" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Initialize cart if it doesn't exist or if items is undefined
        if (!user.cart || !user.cart.items) {
            user.cart = {
                items: new Map(),
                total: 0,
                count: 0
            };
        }

        // Convert cart items to Map if it's not already
        if (!(user.cart.items instanceof Map)) {
            user.cart.items = new Map(Object.entries(user.cart.items));
        }

        // Add or update item in cart
        const existingItem = user.cart.items.get(productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cart.items.set(productId, {
                quantity: 1,
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    category: product.category
                }
            });
        }

        // Update cart totals
        const cartItems = Array.from(user.cart.items.values());
        user.cart.count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        user.cart.total = cartItems.reduce((sum, item) => sum + (item.quantity * item.product.price), 0);

        // Mark cart as modified
        user.markModified('cart');

        // Save and return updated cart
        await user.save();
        
        // Convert Map to plain object for response
        const cartResponse = {
            items: Object.fromEntries(user.cart.items),
            total: user.cart.total,
            count: user.cart.count
        };

        res.json(cartResponse);

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ message: error.message });
    }
});

// Remove from cart
router.post('/remove-from-cart', async (req, res) => {
    try {
        const { userId, productId } = req.body;
        console.log('Remove from cart request received:', {
            userId,
            productId,
            path: req.path,
            baseUrl: req.baseUrl,
            fullPath: `${req.baseUrl}${req.path}`
        });

        // Validate inputs
        if (!userId || !productId) {
            console.log('Missing required fields:', { userId, productId });
            return res.status(400).json({
                message: 'User ID and Product ID are required',
                received: { userId, productId }
            });
        }

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found:', userId);
            return res.status(404).json({ 
                message: 'User not found',
                userId 
            });
        }

        console.log('Current user cart:', user.cart);

        // Check if item exists in cart
        if (!user.cart?.items?.[productId]) {
            console.log('Product not found in cart:', productId);
            return res.status(404).json({
                message: 'Product not found in cart',
                productId
            });
        }

        // Remove item
        try {
            const updatedUser = await user.removeFromCart(productId);
            console.log('Cart updated successfully:', updatedUser.cart);
            return res.json(updatedUser.cart);
        } catch (removeError) {
            console.error('Error in removeFromCart:', removeError);
            throw removeError;
        }

    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ 
            message: 'Failed to remove item from cart',
            error: error.message 
        });
    }
});

// Get cart
router.get('/cart/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.json(user.cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'User routes are working' });
});

module.exports = router; 