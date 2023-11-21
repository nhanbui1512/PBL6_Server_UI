const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/adminController');

router.get('/profile', adminController.profile);
router.get('/password', adminController.password);
router.get('/list-user', adminController.listUser);
router.get('/create-account', adminController.createAccount);
router.get('/detail-user/:id', adminController.detailUser);

router.get('/', adminController.index);
module.exports = router;
