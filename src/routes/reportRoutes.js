const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', reportController.getAllReports);
router.get('/:id', reportController.getReportById);
router.post('/', reportController.createReport);
router.put('/:id', authMiddleware, reportController.updateReport);
router.delete('/:id', authMiddleware, reportController.deleteReport);

module.exports = router;