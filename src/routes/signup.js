const express = require('express');
const RegisterController = require('../app/controllers/registerController');
const registerController = require('../app/controllers/registerController');

const router = express.Router();

router.get('/', RegisterController.index);

router.post('/', registerController.register);

module.exports = router;
