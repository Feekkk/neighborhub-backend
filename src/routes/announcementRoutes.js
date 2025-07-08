const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes
router.get('/', announcementController.getAllAnnouncements);
router.get('/with-expiration', announcementController.getAnnouncementsWithExpiration);
router.get('/expiring', announcementController.getExpiringAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);

// Protected routes (admin only)
router.post('/', authMiddleware, announcementController.createAnnouncement);
router.put('/:id', authMiddleware, announcementController.updateAnnouncement);
router.delete('/:id', authMiddleware, announcementController.deleteAnnouncement);
router.post('/cleanup', authMiddleware, announcementController.performCleanup);

module.exports = router;