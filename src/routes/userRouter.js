const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/userController');

router.get('/profile', userController.profile);
router.post('/updateprofile', userController.updateUser);
router.get('/password', userController.password);
router.post('/replacepassword', userController.replacePassword);
router.get('/', userController.index);

module.exports = router;
