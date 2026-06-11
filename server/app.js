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
// ONLY allow requests from your Vercel frontend and your local testing environment
app.use(cors({
  origin: [
    'https://agri-comply-ai.vercel.app',     // <-- Your actual live Vercel URL
    'http://localhost:5173',                 // Allows your local Vite server to still work
    'http://localhost:3000'                  // Fallback local port
  ],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vault', vaultRoutes);
app.use('/api/compliance', trackARoutes);
app.use('/api/growth', trackBRoutes);

// Static folder for uploaded files (Secure this in production!)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});