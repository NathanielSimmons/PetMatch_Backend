const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to handle user signup
router.post('/signup', userController.signup);

// Route to handle user login
router.post('/login', userController.login);

module.exports = router;