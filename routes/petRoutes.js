const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');
const upload = require('../config/multer');

router.post('/create-pet', upload.array('pictures'), petController.createPet);

router.get('/get-all-pets', petController.getAllPets);

router.get('/get-pets-pictures-for-display', petController.getPetsPicturesForDisplay);

router.get('/get-user-pets/:userId', petController.getUserPets);

router.get('/get-pet/:id', petController.getPetById);


router.put('/update-pet/:id', upload.array('pictures'), petController.updatePet);


router.delete('/delete-pet/:id', petController.deletePet);

module.exports = router;