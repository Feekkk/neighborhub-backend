const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Public routes (or admin only - you can decide)
// add this after this "authMiddleware'"
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Protected routes (Admin only)
router.post('/', authMiddleware, userController.createUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;