const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/profile', adminController.profile);
router.get('/password', adminController.password);
router.get('/list-user', adminController.listUser);
router.get('/create-account', adminController.createAccountView);
router.get('/detail-user/:id', adminController.detailUser);
router.get('/', adminController.index);

router.post('/change-password', adminController.changePassWord);
router.post('/create-account', adminController.registerAccount);
router.post('/update-profile', adminController.updateProfile);
router.post('/update-user', adminController.updateUser);

module.exports = router;
