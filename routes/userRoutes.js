const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.post('/login', userController.login);
router.put('/users/:id', userController.updateUser);

module.exports = router;