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

exports.getPetById = async (req, res) => {
    try {
      const petId = req.params.id;
      
      // Logic to fetch a pet by its ID from the database
      const pet = await Pet.findById(petId);
  
      if (!pet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
  
      res.status(200).json(pet);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.updatePet = async (req, res) => {
    try {
      const petId = req.params.id;
      const updateData = req.body;
  
      // Logic to update a pet by its ID in the database
      const updatedPet = await Pet.findByIdAndUpdate(petId, updateData, { new: true });
  
      if (!updatedPet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
  
      res.status(200).json({ message: 'Pet updated successfully', pet: updatedPet });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  exports.deletePet = async (req, res) => {
    try {
      const petId = req.params.id;
  
      // Logic to delete a pet by its ID from the database
      const deletedPet = await Pet.findByIdAndDelete(petId);
  
      if (!deletedPet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
  
      res.status(200).json({ message: 'Pet deleted successfully', pet: deletedPet });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };