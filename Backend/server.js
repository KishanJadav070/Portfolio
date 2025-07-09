require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 30000, // 30 seconds
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err.message);
});


// Routes
const contactRoutes = require('./routes/contact');
const chatbotRoutes = require('./routes/messageRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/messages', chatbotRoutes);

app.get('/', (req, res) => {
  res.send('🚀 Server is running...');
});

// ✅ Must export the app for Vercel
module.exports = app;
