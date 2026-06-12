const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const vaultRoutes = require('./routes/vaultRoutes');
const trackARoutes = require('./routes/trackARoutes');
const trackBRoutes = require('./routes/trackBRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // 1. Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // 2. Allow specific local development ports
    const allowedLocal = ['http://localhost:5173', 'http://localhost:3000'];
    
    // 3. Allow any sub-domain of vercel.app
    const isVercel = origin.endsWith('.vercel.app');

    if (allowedLocal.includes(origin) || isVercel) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: This origin is not allowed.'));
    }
  },
  credentials: true
}));