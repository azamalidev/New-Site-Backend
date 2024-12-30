const express = require('express');
const notifyController = require('../controllers/notify.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// For Pro Lead Agent Side
router.post('/add', authMiddleware,notifyController.addNotification);
router.get('/get-my-read-messages',authMiddleware, notifyController.getGetReadMessage);
router.get('/get-my-unread-messages',authMiddleware, notifyController.getUnreadMessages);
router.patch('/read-messages',authMiddleware, notifyController.readAllMyMessages);

// For Admin Side
router.get('/get-admin-read-messages',authMiddleware, notifyController.getAllAdminReadMessages);
router.get('/get-admin-unread-messages',authMiddleware, notifyController.getAllAdminUnreadMessages);
router.patch('/admin-read-messages',authMiddleware, notifyController.adminReadAllUserMessages);



module.exports = router;
