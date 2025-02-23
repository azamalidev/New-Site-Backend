const express = require('express');
const videoController = require('../controllers/courseVideo.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add',authMiddleware, videoController.createVideo);
router.delete('/remove-by-id',authMiddleware, videoController.deleteVideo);
router.get('/get-by-course-id',authMiddleware, videoController.getVideo);
module.exports = router;
