const express = require('express');
const lpController = require('../controllers/lpController');
const router = express.Router();

// Get all liquidity pools
router.get('/pools', lpController.getAllPools);

// Get specific pool by ID
router.get('/pools/:id', lpController.getPoolById);

// Get user's liquidity positions
router.get('/positions/:address', lpController.getUserPositions);

// Add liquidity to a pool
router.post('/liquidity/add', lpController.addLiquidity);

// Remove liquidity from a pool
router.post('/liquidity/remove', lpController.removeLiquidity);

module.exports = router;