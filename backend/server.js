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

        'https://mern-ecommerce-7nfx-seven.vercel.app',  // Add your new frontend URL

        'https://mern-ecommerce-mja8uz6tc-bisrats-projects-b32b673c.vercel.app'

    ],

    credentials: true,

    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']

}));

app.use(express.json());



// Add request logging

app.use((req, res, next) => {

    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);

    next();

});



// API Routes

app.use('/api/users', userRoutes);

app.use('/api/products', productRoutes);



// Add this after your middleware setup

app.use('/images', express.static(path.join(__dirname, 'public/images')));



// Root route

app.get('/', async (req, res) => {

    try {

        res.json({ 

            message: 'Backend server is running',

            env: process.env.NODE_ENV,

            timestamp: new Date().toISOString()

        });

    } catch (error) {

        logError(error);

        res.status(500).json({ error: 'Server error', message: error.message });

    }

});



// Health check route

app.get('/api/health', async (req, res) => {

    try {

        res.status(200).json({ 

            status: 'healthy', 

            environment: process.env.NODE_ENV,

            timestamp: new Date().toISOString(),

            mongodb: process.env.MONGODB_URI ? 'configured' : 'not configured'

        });

    } catch (error) {

        logError(error);

        res.status(500).json({ error: 'Health check failed' });

    }

});



// MongoDB connection test route

app.get('/api/db-test', async (req, res) => {

    let connection;

    try {

        // Check MongoDB URI

        if (!process.env.MONGODB_URI) {

            throw new Error('MongoDB URI is not configured');

        }



        // Connect to MongoDB

        connection = await mongoose.connect(process.env.MONGODB_URI, {

            useNewUrlParser: true,

            useUnifiedTopology: true,

            serverSelectionTimeoutMS: 5000

        });



        res.json({

            status: 'success',

            timestamp: new Date().toISOString(),

            connected: true,

            database: connection.connection.name,

            host: connection.connection.host

        });

    } catch (error) {

        logError(error);

        res.status(500).json({

            status: 'error',

            timestamp: new Date().toISOString(),

            message: error.message,

            details: process.env.NODE_ENV === 'development' ? error.stack : undefined

        });

    } finally {

        // Close connection for serverless environment

        if (connection) {

            try {

                await connection.disconnect();

            } catch (error) {

                console.error('Error disconnecting from MongoDB:', error);

            }

        }

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



// Handle 404

app.use((req, res) => {

    res.status(404).json({ 

        error: 'Route not found',

        path: `${req.method} ${req.path}`,

        timestamp: new Date().toISOString()

    });

});



// Export the express app

module.exports = app;
