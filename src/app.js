const express = require('express');
const app = express();

app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

module.exports = app;