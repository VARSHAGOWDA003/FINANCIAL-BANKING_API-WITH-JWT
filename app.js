const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // ✅ Import CORS
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

// Load environment variables
dotenv.config();

// Log environment variables in development mode for debugging
if (process.env.NODE_ENV === 'development') {
  console.log("MongoDB URI: ", process.env.MONGODB_URI);
  console.log("JWT Secret: ", process.env.JWT_SECRET);
  console.log("Port: ", process.env.PORT);
}

// Connect to the database
connectDB();

const app = express();

// ✅ Enable CORS for frontend requests (Fixes CORS error)
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware to parse JSON request bodies
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/transactions', transactionRoutes);

// ✅ API Status Check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
