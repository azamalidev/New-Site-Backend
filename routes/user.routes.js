const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/profile-detail', userController.varifyEmail);
router.post('/account-setup', userController.accountSetup);


router.patch('/reset-password', userController.resetPassword);
router.get('/list',authMiddleware, userController.getUserList);
router.patch('/edit-profile',authMiddleware, userController.editProfile);
router.delete('/delete-profile',authMiddleware, userController.deleteProfile);
router.get('/get-by-id',authMiddleware, userController.getUserById);
router.post('/login', userController.login);
router.get('/get-employees', userController.getEmployeeList);


module.exports = router;
