const mongoose = require('mongoose');

const plannerEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  date: { type: String, required: true }, // Simple string 'YYYY-MM-DD'
  time: { type: String, required: true },  // Simple string 'HH:mm'
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  reminderTriggered: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('PlannerEvent', plannerEventSchema);
