const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup', userController.signup);
router.post('/logout', userController.logout);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUserProfile);

module.exports = router;