const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();

// Import our LP controller that handles the business logic
const lpController = require('../controllers/lpController');

/**
 * Middleware to validate request data
 * Returns a 400 error if any validation rules fail
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/**
 * Pool Information Routes
 */

// Get detailed information about a specific liquidity pool
router.get('/pool/:poolId',
  param('poolId').isString().notEmpty(),
  validate,
  lpController.getPoolInfo
);

// Get a user's current positions and shares across all pools
router.get('/position/:userAddress',
  param('userAddress').isString().notEmpty(),
  validate,
  lpController.getUserPosition
);

/**
 * Liquidity Management Routes
 */

// Add liquidity to a pool by providing both tokens
router.post('/add-liquidity',
  [
    body('tokenA').isString().notEmpty(),
    body('tokenB').isString().notEmpty(),
    body('amountA').isString().notEmpty(),
    body('amountB').isString().notEmpty(),
    body('userAddress').isString().notEmpty(),
  ],
  validate,
  lpController.addLiquidity
);

// Remove liquidity from a pool and receive both tokens back
router.post('/remove-liquidity',
  [
    body('poolId').isString().notEmpty(),
    body('amount').isString().notEmpty(),
    body('userAddress').isString().notEmpty(),
  ],
  validate,
  lpController.removeLiquidity
);

/**
 * Analytics Routes
 */

// Get 24-hour trading volume for a specific pool
router.get('/volume/:poolId',
  param('poolId').isString().notEmpty(),
  validate,
  lpController.getPoolVolume
);

/**
 * Trading Routes
 */

// Swap tokens using the liquidity pool
router.post('/swap',
  [
    body('tokenIn').isString().notEmpty(),
    body('tokenOut').isString().notEmpty(),
    body('amountIn').isString().notEmpty(),
    body('userAddress').isString().notEmpty(),
    body('slippage').isFloat({ min: 0, max: 100 }).optional(),
  ],
  validate,
  lpController.swapTokens
);

module.exports = router; 