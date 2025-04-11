require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/db'); 


// Import Routes
const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const Question = require('./routes/qurstionRoutes');
const Answer = require('./routes/answerRoutes');
const searchRoutes =require ('./routes/search.js');


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/questions', Question);
app.use('/api/answers', Answer);



module.exports = app;
