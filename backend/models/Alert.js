const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: {
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false }
  },
  audioMessage: { type: String, required: false }, // path to file
  status: { type: String, enum: ['pending', 'sent', 'active', 'precaution'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Alert', alertSchema);
