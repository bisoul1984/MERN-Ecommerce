const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
require('dotenv').config();
const path = require('path');

// Initialize express
const app = express();

// Basic error logging
const logError = (err) => {
    console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
    });
};

// Middleware
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://mern-ecommerce-7nfx-seven.vercel.app',
        'https://mern-ecommerce-frontend-seven.vercel.app',
        process.env.CORS_ORIGIN
    ].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Add preflight handling
app.options('*', cors());

app.use(express.json());

// Add headers for Vercel deployment
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    next();
});

// Add request logging before routes
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`, {
        origin: req.headers.origin,
        host: req.headers.host,
        url: req.url
    });
    next();
});

// Add this before your routes
app.use((req, res, next) => {
    console.log('Request:', {
        method: req.method,
        path: req.path,
        body: req.body,
        headers: req.headers
    });
    next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Root route for testing
app.get('/', (req, res) => {
    res.json({
        message: 'Backend API is running',
        timestamp: new Date().toISOString()
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    });
});

// MongoDB connection test route
app.get('/api/db-test', async (req, res) => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB URI is not configured');
        }

        const status = mongoose.connection.readyState;
        const statusMap = {
            0: 'disconnected',
            1: 'connected',
            2: 'connecting',
            3: 'disconnecting'
        };

        res.json({
            status: 'success',
            timestamp: new Date().toISOString(),
            connection: statusMap[status],
            database: mongoose.connection.name,
            host: mongoose.connection.host
        });
    } catch (error) {
        logError(error);
        res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            message: error.message
        });
    }
});

// Add this after your routes but before error handlers
app.use((req, res, next) => {
    console.log('Request received:', {
        method: req.method,
        originalUrl: req.originalUrl,
        path: req.path,
        baseUrl: req.baseUrl,
        body: req.body
    });
    next();
});

// Update your 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', {
        method: req.method,
        originalUrl: req.originalUrl,
        path: req.path,
        baseUrl: req.baseUrl,
        body: req.body
    });
    res.status(404).json({ 
        error: 'Route not found',
        method: req.method,
        path: req.path,
        originalUrl: req.originalUrl,
        timestamp: new Date().toISOString()
    });
});

// Add this after your routes but before error handlers
app.get('/api/debug/routes', (req, res) => {
    const routes = [];
    
    // Get routes directly registered on app
    app._router.stack.forEach(middleware => {
        if (middleware.route) {
            routes.push({
                path: middleware.route.path,
                methods: Object.keys(middleware.route.methods)
            });
        } else if (middleware.name === 'router') {
            middleware.handle.stack.forEach(handler => {
                if (handler.route) {
                    const basePath = middleware.regexp.toString()
                        .replace('\\/?(?=\\/|$)', '')
                        .replace(/^\\\//, '/');
                    routes.push({
                        path: basePath + handler.route.path,
                        methods: Object.keys(handler.route.methods)
                    });
                }
            });
        }
    });
    
    // Return all registered routes
    res.json({
        routes,
        productRoutes: app._router.stack
            .filter(layer => layer.name === 'router' && layer.regexp.toString().includes('products'))
            .map(layer => layer.handle.stack
                .filter(r => r.route)
                .map(r => ({
                    path: `/api/products${r.route.path}`,
                    methods: Object.keys(r.route.methods)
                }))
            ).flat(),
        userRoutes: app._router.stack
            .filter(layer => layer.name === 'router' && layer.regexp.toString().includes('users'))
            .map(layer => layer.handle.stack
                .filter(r => r.route)
                .map(r => ({
                    path: `/api/users${r.route.path}`,
                    methods: Object.keys(r.route.methods)
                }))
            ).flat()
    });
});

// Move the app.listen() call to only run in non-production
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8081;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log('MongoDB Connection State:', mongoose.connection.readyState);
    });
}

module.exports = app;