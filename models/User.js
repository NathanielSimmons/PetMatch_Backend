const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: String,
  aboutMe: String,
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;