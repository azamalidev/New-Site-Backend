const express = require('express');
const orderController = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware,orderController.addComment);
router.get('/get-by-id',authMiddleware, orderController.getCommentListById);
router.patch('/in-active',authMiddleware, orderController.inactiveAllComment);



module.exports = router;
