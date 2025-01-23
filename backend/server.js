const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

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
app.use(cors());
app.use(express.json());

// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

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
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        logError(error);
        res.status(500).json({ error: 'Health check failed' });
    }
});

// MongoDB connection test route
app.get('/api/db-test', async (req, res) => {
    try {
        // Check MongoDB URI
        if (!process.env.MONGODB_URI) {
            throw new Error('MongoDB URI is not configured');
        }

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        res.json({
            status: 'success',
            timestamp: new Date().toISOString(),
            connected: true,
            database: mongoose.connection.name
        });
    } catch (error) {
        logError(error);
        res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            message: error.message
        });
    } finally {
        // Close connection for serverless environment
        if (mongoose.connection.readyState === 1) {
            await mongoose.connection.close();
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
