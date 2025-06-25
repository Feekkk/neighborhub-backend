const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', announcementController.getAllAnnouncements);
router.get('/:id', announcementController.getAnnouncementById);
router.post('/', authMiddleware, announcementController.createAnnouncement);
router.put('/:id', authMiddleware, announcementController.updateAnnouncement);
router.delete('/:id', authMiddleware, announcementController.deleteAnnouncement);

module.exports = router;