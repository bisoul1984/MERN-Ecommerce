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

        'https://mern-ecommerce-7nfx.vercel.app',

        'https://mern-ecommerce-7nfx-cdq0uo3rs-bisrats-projects-b32b673c.vercel.app',

        'https://mern-ecommerce-mja8uz6tc-bisrats-projects-b32b673c.vercel.app'

    ],

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']

}));

app.use(express.json());



// Add request logging

app.use((req, res, next) => {

    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);

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



// API Routes - IMPORTANT: Keep these before error handlers

app.use('/api/products', productRoutes);

app.use('/api/users', userRoutes);



// Add logging to verify route registration

console.log('Registered routes:', {

    products: '/api/products',

    users: '/api/users'

});



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

        env: process.env.NODE_ENV,

        mongoStatus: mongoose.connection.readyState,

        apis: {

            products: '/api/products',

            users: '/api/users'

        },

        cors: {

            origins: [

                'http://localhost:3000',

                'https://mern-ecommerce-7nfx.vercel.app',

                'https://mern-ecommerce-7nfx-cdq0uo3rs-bisrats-projects-b32b673c.vercel.app',

                'https://mern-ecommerce-mja8uz6tc-bisrats-projects-b32b673c.vercel.app'

            ]

        }

    });

});



// Debug route

app.get('/api/debug', (req, res) => {

    res.json({

        routes: {

            products: app._router.stack.some(r => r.route && r.route.path === '/api/products'),

            users: app._router.stack.some(r => r.route && r.route.path === '/api/users')

        },

        mongodb: {

            state: mongoose.connection.readyState,

            connected: mongoose.connection.readyState === 1,

            database: mongoose.connection.name

        },

        environment: process.env.NODE_ENV,

        timestamp: new Date().toISOString()

    });

});



// Test route

app.get('/api/test', (req, res) => {

    res.json({

        message: 'API is working',

        env: process.env.NODE_ENV,

        mongoStatus: mongoose.connection.readyState,

        timestamp: new Date().toISOString()

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



// Error handling middleware - IMPORTANT: Keep this after routes

app.use((err, req, res, next) => {

    logError(err);

    res.status(500).json({

        error: 'Internal Server Error',

        timestamp: new Date().toISOString(),

        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'

    });

});



// 404 handler - IMPORTANT: This must be the last middleware

app.use((req, res) => {

    console.log('404 - Route not found:', req.path);

    res.status(404).json({ 

        error: 'Route not found',

        path: req.path,

        timestamp: new Date().toISOString()

    });

});



module.exports = app;
