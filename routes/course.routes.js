const express = require('express');
const orderController = require('../controllers/course.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, orderController.createCourse);
router.get('/list', orderController.getCourseList);
router.get('/get-by-id', orderController.getCourseById);
module.exports = router;
