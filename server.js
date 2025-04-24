require('dotenv').config();
const express = require('express');
const cors = require('cors');
const lpRoutes = require('./routes/lp');
const { apiKeyAuth } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/meteora', apiKeyAuth, lpRoutes);

// Health check endpoint (no auth required)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});