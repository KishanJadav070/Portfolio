require('dotenv').config(); // Load env variables first

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const messageRoutes = require('./routes/messageRoutes');

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

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Atlas connected"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// 📦 API Routes
app.use('/api', messageRoutes);

// 🚀 Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
