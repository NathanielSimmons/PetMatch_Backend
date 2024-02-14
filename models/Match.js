const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet',
      required: true
    },
    matchedAt: {
      type: Date,
      default: Date.now
    }
  });

  const Match = mongoose.model('Match', matchSchema);

  module.exports = Match;