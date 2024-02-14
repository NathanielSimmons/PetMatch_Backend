const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');


router.get('/pets', matchController.getPetsForMatching);


router.post('/:petId/like', matchController.likePet);


router.post('/:petId/skip', matchController.skipPet);


router.get('/matched-pets', matchController.getMatchedPets);

module.exports = router;