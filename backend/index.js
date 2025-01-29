// This ensures the server is properly exported for Vercel
const app = require('./server');

// Note: Don't call app.listen() here since it's already in server.js
module.exports = app; 