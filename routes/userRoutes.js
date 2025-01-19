const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../config/multer');

router.post('/signup', upload.single('profilePic'), userController.signup);

router.post('/logout', userController.logout);

router.post('/login', userController.login);

router.get('/get-user/:id', userController.getUserById);

router.put('/update-user/:id', upload.single('profilePic'), userController.updateUserProfile);

module.exports = router;