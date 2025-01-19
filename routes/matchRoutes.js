const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');


router.get('/get-pets-for-matching/:userId', matchController.getPetsForMatching);


router.post('/like-pet/:petId', matchController.likePet);


router.post('/skip-pet/:petId', matchController.skipPet);


router.get('/get-matched-pets/:userId', matchController.getMatchedPets);

module.exports = router;