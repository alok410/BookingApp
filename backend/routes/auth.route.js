const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.signup);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/login', authController.login);

module.exports = router;
