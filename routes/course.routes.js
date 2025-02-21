const express = require('express');
const orderController = require('../controllers/course.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, orderController.createCourse);
router.get('/list', orderController.getCourseList);
router.get('/get-by-id', orderController.getCourseById);
router.delete('/delete-course',authMiddleware, orderController.deleteCourse);
router.patch('/update-course',authMiddleware, orderController.updateCourse);
module.exports = router;
