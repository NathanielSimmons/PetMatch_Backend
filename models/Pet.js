const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  breed: String,
  age: Number,
  personality: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  pictures: String
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;