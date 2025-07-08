const express = require('express');
const cors = require('cors');
const schedulerService = require('./services/schedulerService');
const app = express();

app.use(express.json());
app.use(cors());

// Start the scheduler for automatic cleanup
schedulerService.start();

app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to NeighborHub API',
    version: '1.0.0',
    features: {
      'auto-cleanup': 'Announcements are automatically deleted after 30 days',
      'expiration-tracking': 'Track announcement expiration dates and get warnings'
    },
    endpoints: {
      users: '/api/users',
      events: '/api/events',
      announcements: '/api/announcements',
      'announcements-with-expiration': '/api/announcements/with-expiration',
      'expiring-announcements': '/api/announcements/expiring',
      'manual-cleanup': 'POST /api/announcements/cleanup',
      reports: '/api/reports',
      auth: '/api/auth'
    }
  });
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

module.exports = app;