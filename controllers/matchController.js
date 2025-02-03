const Pet = require('../models/Pet');
const Match = require('../models/Match');


exports.getPetsForMatching = async (req, res) => {
  try {
    const { userId } = req.params;
    const pets = await Pet.find({ owner: { $ne: userId }, likedBy: { $ne: userId } });
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
  try {
    const { userId } = req.params;
    const petsLikedByUser = await Pet.find({ 'likedBy': userId })
      .populate('owner', '-password -pets -__v -createdAt -updatedAt')
      .select('-likedBy -__v -createdAt -updatedAt');
    // console.log('Pets liked by user: ', petsLikedByUser);
    const mutualMatches = [];
    for (let petLikedByUser of petsLikedByUser) {
      const petOwner = petLikedByUser.owner._id;
      const petsOfUserLikedByOwner = await Pet.find({ 'likedBy': petOwner, 'owner': userId });
      if (petsOfUserLikedByOwner.length > 0) {
        mutualMatches.push(petLikedByUser);
      }
    }
    // console.log('Matched Pets: ', mutualMatches);
    res.json(mutualMatches);
  } catch (error) {
    console.error('Error fetching matched pets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const test = async () => {
  const userId = "678856c7a752006382debf63";
  const petsLikedByUser = await Pet.find({ 'likedBy': userId })
    .populate('owner', '-password -pets -__v -createdAt -updatedAt')
    .select('-likedBy -__v -createdAt -updatedAt');
  console.log('Pets liked by user: ', petsLikedByUser);
  const mutualMatches = [];
  for (let petLikedByUser of petsLikedByUser) {
    const petOwner = petLikedByUser.owner._id;
    const petsOfUserLikedByOwner = await Pet.find({ 'likedBy': petOwner, 'owner': userId });
    if (petsOfUserLikedByOwner.length > 0) {
      mutualMatches.push(petLikedByUser);
    }
  }
  console.log('Matched Pets: ', mutualMatches);
};

// test();