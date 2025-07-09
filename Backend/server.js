require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB:', err.message);
    process.exit(1); 
  });

// Import Routes
const contactRoutes = require('./routes/contact');
const chatbotRoutes = require('./routes/messageRoutes');

// Routes
app.use('/api/contact', contactRoutes);      // POST /api/contact
app.use('/api/messages', chatbotRoutes);     // POST /api/messages

// Health Check Route
app.get('/', (req, res) => {
  res.send('🚀 Server is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server is listening at http://localhost:${PORT}`);
});
