const app = require('./app');
const cors = require('cors');
const mongoose = require('mongoose');

// Basic error logging
const logError = (err) => {
    console.error('Error details:', {
        message: err.message,
        stack: err.stack,
        name: err.name
    });
};

// Enable CORS
app.use(cors());

// Add request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({ 
        message: 'Backend server is running',
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Health check route
app.get('/api/health', (req, res) => {
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
    try {
        // Check if MongoDB URI is configured
        if (!process.env.MONGODB_URI) {
            return res.status(500).json({
                status: 'error',
                message: 'MongoDB URI is not configured',
                timestamp: new Date().toISOString()
            });
        }

        // Try to connect to MongoDB if not already connected
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000,
                retryWrites: true,
                w: 'majority'
            });
        }

        res.json({
            status: 'success',
            timestamp: new Date().toISOString(),
            connected: mongoose.connection.readyState === 1,
            dbState: mongoose.connection.readyState,
            dbName: mongoose.connection.name,
            host: mongoose.connection.host
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        res.status(500).json({
            status: 'error',
            timestamp: new Date().toISOString(),
            message: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
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

// Handle 404
app.use((req, res) => {
    console.log(`404 - Route not found: ${req.method} ${req.path}`);
    res.status(404).json({ 
        error: 'Route not found',
        path: `${req.method} ${req.path}`,
        timestamp: new Date().toISOString()
    });
});

// Only start server in development
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
