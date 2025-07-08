require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Initialize Express app
const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// 🔌 MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in the .env file");
  process.exit(1);
}

// ✅ Mongoose connect without deprecated options
mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// 📦 API Routes
const messageRoutes = require('./routes/messageRoutes');
app.use('/api', messageRoutes);

// ✅ Default test route
app.get('/', (req, res) => {
  res.send("🚀 Server is running!");
});

// ✅ Hybrid Export/Listen for Vercel + Local
if (require.main === module) {
  // Run locally
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running locally at http://localhost:${PORT}`);
  });
} else {
  // Export for serverless (Vercel)
  module.exports = app;
}
