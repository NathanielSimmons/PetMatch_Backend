const Pet = require('../models/Pet');
const Match = require('../models/Match');

// Controller to fetch pets for matching
exports.getPetsForMatching = async (req, res) => {
  try {
    // Fetch all pets for matching
    const pets = await Pet.find();
    res.json(pets);
  } catch (error) {
    console.error('Error fetching pets for matching:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to like a pet
exports.likePet = async (req, res) => {
  const { petId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    // Check if the user already liked this pet
    if (pet.likedBy.includes(userId)) {
      return res.status(400).json({ error: 'You already liked this pet' });
    }

    // Add userId to likedBy array in the pet model
    pet.likedBy.push(userId);
    await pet.save();

    // Check if the pet already liked the user, indicating a match
    const existingMatch = await Match.findOne({ user: pet.owner, pet: petId });
    if (existingMatch) {
      return res.json({ message: 'You have a new match!' });
    }

    // Create a match record (optional based on your requirements)
    await Match.create({ user: pet.owner, pet: petId });

    res.json({ message: 'Pet liked successfully' });
  } catch (error) {
    console.error('Error liking pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to skip a pet
exports.skipPet = async (req, res) => {
  const { petId } = req.params;

  try {
    // Check if the pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    // Implement logic to skip a pet (if needed)
    // For example, you may want to update a counter for skipped pets or maintain a skippedPets array
    // Here, we're just sending a response indicating that the pet has been skipped

    res.json({ message: 'Pet skipped successfully' });
  } catch (error) {
    console.error('Error skipping pet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller to fetch matched pets
exports.getMatchedPets = async (req, res) => {
  const { userId } = req.query;

  try {
    // Fetch matched pets for the user
    const matches = await Match.find({ user: userId }).populate('pet');
    const matchedPets = matches.map(match => match.pet);
    res.json(matchedPets);
  } catch (error) {
    console.error('Error fetching matched pets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
