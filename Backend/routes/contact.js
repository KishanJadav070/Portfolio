const express = require('express');
const router = express.Router();
const Message = require('../model/Message');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'All fields are required' });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.status(201).json({ success: true, message: 'Message saved successfully!' });
  } catch (err) {
    console.error('❌ Error saving contact message:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
