const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  try {
    // Logic to create a new pet profile
    const { name, breed, age, personality } = req.body;

    // Validate input data
    if (!name || !breed || !age || !personality) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new pet instance
    const newPet = new Pet({
      name,
      breed,
      age,
      personality
    });

    // Save pet to the database
    await newPet.save();

    res.status(201).json({ message: 'Pet profile created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    // Logic to fetch all pets from the database
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
