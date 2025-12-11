const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://harikarthikvajravel12_db_user:harikarthik123@cluster0.w9fwj2q.mongodb.net/PortfolioShareDB';

mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth');
const portfolioRoutes = require('./routes/portfolio');

app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({ message: 'Portfolio Sharing API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
