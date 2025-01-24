const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');

const productRoutes = require('./routes/productRoutes');

require('dotenv').config();

const path = require('path');



// Initialize express

const app = express();



// MongoDB connection events

mongoose.connection.on('connected', () => {

    console.log('MongoDB connected to:', mongoose.connection.host);

});



mongoose.connection.on('error', (err) => {

    console.error('MongoDB connection error:', err);

});



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



// Request logging middleware

app.use((req, res, next) => {

    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);

    next();

});



// Route debugging middleware

app.use((req, res, next) => {

    console.log('Route debugging:', {

        path: req.path,

        method: req.method,

        registeredRoutes: app._router.stack

            .filter(r => r.route)

            .map(r => ({

                path: r.route.path,

                methods: Object.keys(r.route.methods)

            }))

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



// Root route

app.get('/', (req, res) => {

    res.json({

        message: 'API is running',

        routes: {

            health: '/api/health',

            products: '/api/products',

            users: '/api/users',

            debug: '/api/debug'

        },

        timestamp: new Date().toISOString()

    });

});



// Direct test route

app.get('/api/test-direct', (req, res) => {

    res.json({

        working: true,

        mongoState: mongoose.connection.readyState,

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



// Route test endpoint

app.get('/api/route-test', (req, res) => {

    res.json({

        message: 'Route handler working',

        registeredRoutes: app._router.stack

            .filter(r => r.route)

            .map(r => ({

                path: r.route.path,

                methods: Object.keys(r.route.methods)

            })),

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



// Error handling middleware

app.use((err, req, res, next) => {

    logError(err);

    res.status(500).json({

        error: 'Internal Server Error',

        timestamp: new Date().toISOString(),

        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'

    });

});



// 404 handler - Must be last

app.use((req, res) => {

    console.log('404 - Route not found:', req.path);

    res.status(404).json({ 

        error: 'Route not found',

        path: req.path,

        timestamp: new Date().toISOString()

    });

});

module.exports = app;
