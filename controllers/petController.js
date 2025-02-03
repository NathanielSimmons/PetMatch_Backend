const Pet = require('../models/Pet');
const s3 = require('../config/aws');
const { v4: uuidv4 } = require('uuid');

exports.createPet = async (req, res) => {
  try {
    const { name, species, breed, age, personality, owner } = req.body;
    const pictures = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
        const fileUploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        // Upload file to AWS S3
        const uploadResult = await s3.upload(fileUploadParams).promise();

        // Save the S3 URL to the pictures array
        pictures.push(uploadResult.Location);
      }
    }

    const newPet = new Pet({
      name,
      species,
      breed,
      age,
      personality,
      pictures,
      owner
    });

    await newPet.save();
    res.status(201).json({ message: 'Pet added successfully' });
  } catch (error) {
    console.error(error);
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

exports.getPetsPicturesForDisplay = async (req, res) => {
  try {
    const pets = await Pet.find();
    let pictures = [];
    pets.forEach((pet) => {
      pictures = pictures.concat(pet.pictures);
    });
    res.status(200).json(pictures);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getUserPets = async (req, res) => {
  try {
    const { userId } = req.params;
    const pets = await Pet.find({ owner: userId });
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
    const pictures = [];

    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileName = `${uuidv4()}.${file.mimetype.split('/')[1]}`;
        const fileUploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        };

        // Upload file to AWS S3
        const uploadResult = await s3.upload(fileUploadParams).promise();

        // Save the S3 URL to the pictures array
        pictures.push(uploadResult.Location);
      }
    }
    if (pictures.length > 0) {
      updateData.pictures = pictures;
    }

    const updatedPet = await Pet.findByIdAndUpdate(petId, updateData, { new: true });

    if (!updatedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    res.status(200).json({ message: 'Pet updated successfully', pet: updatedPet });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
//  delete pet
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

