require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Init Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connect
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Import Routes
const contactRoutes = require('./routes/contact'); // For contact form
const chatbotRoutes = require('./routes/chatbot'); // For chatbot + Gemini

// Use Routes
app.use('/api/contact', contactRoutes);      // POST to /api/contact
app.use('/api/messages', chatbotRoutes);     // POST to /api/messages

// Health check
app.get('/', (req, res) => {
  res.send('🚀 Server is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server listening at http://localhost:${PORT}`);
});
