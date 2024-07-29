const controller = require('./controller');
const express = require('express');
const router = express.Router();

router.post('/signUp',controller.createUser);
router.post('/signIn',controller.user_login);

module.exports = router;