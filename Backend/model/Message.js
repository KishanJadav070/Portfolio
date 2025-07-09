const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    default: null,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    default: null,
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['user', 'bot', 'admin', 'recruiter', 'guest'], // ✅ updated to support more types
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
