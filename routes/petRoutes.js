const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController');

// Route to handle creating a new pet profile
router.post('/pets', petController.createPet);

// Route to get all pets
router.get('/pets', petController.getAllPets);

// Route to get a specific pet by ID
router.get('/pets/:id', petController.getPetById);

// Route to update a pet's profile
router.put('/pets/:id', petController.updatePet);

// Route to delete a pet's profile
router.delete('/pets/:id', petController.deletePet);

module.exports = router;