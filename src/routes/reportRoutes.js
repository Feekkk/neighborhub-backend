const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

// Basic CRUD routes
router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);
router.put('/:id', authMiddleware, reportController.updateReport);
router.delete('/:id', authMiddleware, reportController.deleteReport);

// PDF generation routes
router.get('/pdf/all', authMiddleware, reportController.generateAllReportsPDF);
router.get('/pdf/:id', authMiddleware, reportController.generateSingleReportPDF);

// Heatmap routes for Google Maps integration
router.get('/heatmap/data', reportController.getHeatmapData);
router.get('/heatmap/bounds', reportController.getReportsInBounds);
router.get('/heatmap/stats', reportController.getHeatmapStats);
router.get('/heatmap/time-based', reportController.getTimeBasedHeatmapData);

module.exports = router;