const express = require('express');
const router = express.Router();
const meteoraController = require('../controllers/meteoraController');
const { validateRequest } = require('../middleware/validateRequest');
const { verifyToken } = require('../middleware/auth');

/**
 * @route   GET /api/meteora/pools
 * @desc    Get all liquidity pools
 * @access  Public
 */
router.get('/pools', meteoraController.getAllPools);

/**
 * @route   GET /api/meteora/pools/:poolId
 * @desc    Get specific liquidity pool details
 * @access  Public
 */
router.get('/pools/:poolId', validateRequest('getPoolById'), meteoraController.getPoolById);

/**
 * @route   GET /api/meteora/tokens
 * @desc    Get all supported tokens
 * @access  Public
 */
router.get('/tokens', meteoraController.getSupportedTokens);

/**
 * @route   GET /api/meteora/user/:address/positions
 * @desc    Get user's LP positions
 * @access  Public
 */
router.get('/user/:address/positions', validateRequest('getUserPositions'), meteoraController.getUserPositions);

/**
 * Protected routes (require authentication)
 */

/**
 * @route   POST /api/meteora/pools/add-liquidity
 * @desc    Add liquidity to a pool
 * @access  Private
 */
router.post('/pools/add-liquidity', verifyToken, validateRequest('addLiquidity'), meteoraController.addLiquidity);

/**
 * @route   POST /api/meteora/pools/remove-liquidity
 * @desc    Remove liquidity from a pool
 * @access  Private
 */
router.post('/pools/remove-liquidity', verifyToken, validateRequest('removeLiquidity'), meteoraController.removeLiquidity);

/**
 * @route   GET /api/meteora/user/rewards
 * @desc    Get user's rewards
 * @access  Private
 */
router.get('/user/rewards', verifyToken, meteoraController.getUserRewards);

/**
 * @route   POST /api/meteora/pools/claim-rewards
 * @desc    Claim rewards from a pool
 * @access  Private
 */
router.post('/pools/claim-rewards', verifyToken, validateRequest('claimRewards'), meteoraController.claimRewards);

module.exports = router;
