require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);

// Connect to Database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected successfully');
    // Only start the Express server once the database is connected
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log('MongoDB connection error:', err));
