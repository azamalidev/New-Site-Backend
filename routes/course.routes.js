const express = require('express');
const orderController = require('../controllers/course.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware,orderController.createCourse);
router.get('/list',authMiddleware, orderController.getCourseList);

router.get('/get-by-id',authMiddleware, orderController.getCourseById);


module.exports = router;
