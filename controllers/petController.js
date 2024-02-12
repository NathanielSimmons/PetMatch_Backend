const Pet = require('../models/Pet');

exports.createPet = async (req, res) => {
  
  try {
    const { name, breed, age, personality } = req.body;

    
    if (!name || !breed || !age || !personality) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    
    const newPet = new Pet(
     req.body
    );

    
    await newPet.save();

    res.status(201).json({ message: 'Pet profile created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getPetById = async (req, res) => {
    try {
      const petId = req.params.id;
      
      
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
  
      
      const deletedPet = await Pet.findByIdAndDelete(petId);
  
      if (!deletedPet) {
        return res.status(404).json({ error: 'Pet not found' });
      }
  
      res.status(200).json({ message: 'Pet deleted successfully', pet: deletedPet });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };