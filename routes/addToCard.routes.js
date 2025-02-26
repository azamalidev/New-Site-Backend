const express = require('express');
const orderController = require('../controllers/addToCard.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, orderController.addToCard);
router.get('/get-all', authMiddleware, orderController.getAllAddToCard);
router.delete('/delete', authMiddleware, orderController.deleteAll);
router.patch('/upload-challan', authMiddleware, orderController.uploadChallan);
router.get('/get-paid', authMiddleware, orderController.getPaidCourse);
router.get('/get-paid-all', authMiddleware, orderController.getAllUserPaidCourse);

module.exports = router;
