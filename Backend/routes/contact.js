const express = require('express');
const router = express.Router();
const Message = require('../model/Message');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        error: 'All fields (name, email, message) are required.',
      });
    }

    // Create and save message
    const newMessage = new Message({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      role: 'user', // Optional field, if your schema includes it
    });

    await newMessage.save();

    return res.status(201).json({
      success: true,
      message: '✅ Message saved successfully!',
    });
  } catch (err) {
    console.error('❌ Error saving contact message:', err.message);
    return res.status(500).json({
      success: false,
      error: '🚨 Internal server error. Please try again later.',
    });
  }
});

module.exports = router;
