const Pet = require('../models/Pet');
const Match = require('../models/Match');


exports.getPetsForMatching = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets for matching:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.likePet = async (req, res) => {
  const { petId } = req.params;
  const { userId } = req.body;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    if (pet.likedBy.includes(userId)) {
      return res.status(400).json({ error: 'You already liked this pet' });
    }

    pet.likedBy.push(userId);
    await pet.save();

    const existingMatch = await Match.findOne({ user: pet.owner, pet: petId });
    if (existingMatch) {
      return res.json({ message: 'You have a new match!' });
    }

    await Match.create({ user: pet.owner, pet: petId });

    res.json({ message: 'Pet liked successfully' });
  } catch (error) {
    console.error('Error liking pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.skipPet = async (req, res) => {
  const { petId } = req.params;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.json({ message: 'Pet skipped successfully' });
  } catch (error) {
    console.error('Error skipping pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMatchedPets = async (req, res) => {
  const { userId } = req.query;

  try {
    const matches = await Match.find({ user: userId }).populate('pet');
    const matchedPets = matches.map(match => match.pet);
    res.json(matchedPets);
  } catch (error) {
    console.error('Error fetching matched pets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
