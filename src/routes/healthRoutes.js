const express = require('express');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Check API health
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Meteora LP API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

module.exports = router;
