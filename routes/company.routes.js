const express = require('express');
const orderController = require('../controllers/company.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware,orderController.createCompany);
router.get('/list',authMiddleware, orderController.getCompanyList);


module.exports = router;
