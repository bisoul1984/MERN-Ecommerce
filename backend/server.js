const app = require('./app');
const cors = require('cors');

// Enable CORS - allow all origins for now since frontend URL isn't deployed yet
app.use(cors());

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'healthy', environment: process.env.NODE_ENV });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        error: 'Something broke!',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Internal Server Error'
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start server if not in production (Vercel will handle this in production)
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3001;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

module.exports = app;
