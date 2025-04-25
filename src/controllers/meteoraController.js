const { logger } = require('../utils/logger');
const { AppError } = require('../middleware/errorHandler');
const meteoraService = require('../services/meteoraService');

/**
 * Get all liquidity pools
 * @route GET /api/meteora/pools
 */
const getAllPools = async (req, res, next) => {
  try {
    const pools = await meteoraService.getAllPools();
    
    res.status(200).json({
      status: 'success',
      data: {
        count: pools.length,
        pools
      }
    });
  } catch (error) {
    logger.error('Error getting all pools', { error: error.message });
    next(new AppError('Failed to retrieve liquidity pools', 500));
  }
};

/**
 * Get specific liquidity pool details
 * @route GET /api/meteora/pools/:poolId
 */
const getPoolById = async (req, res, next) => {
  try {
    const { poolId } = req.params;
    const pool = await meteoraService.getPoolById(poolId);
    
    if (!pool) {
      return next(new AppError('Liquidity pool not found', 404));
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        pool
      }
    });
  } catch (error) {
    logger.error('Error getting pool by ID', { poolId: req.params.poolId, error: error.message });
    next(new AppError('Failed to retrieve liquidity pool details', 500));
  }
};

/**
 * Get all supported tokens
 * @route GET /api/meteora/tokens
 */
const getSupportedTokens = async (req, res, next) => {
  try {
    const tokens = await meteoraService.getSupportedTokens();
    
    res.status(200).json({
      status: 'success',
      data: {
        count: tokens.length,
        tokens
      }
    });
  } catch (error) {
    logger.error('Error getting supported tokens', { error: error.message });
    next(new AppError('Failed to retrieve supported tokens', 500));
  }
};

/**
 * Get user's LP positions
 * @route GET /api/meteora/user/:address/positions
 */
const getUserPositions = async (req, res, next) => {
  try {
    const { address } = req.params;
    const positions = await meteoraService.getUserPositions(address);
    
    res.status(200).json({
      status: 'success',
      data: {
        count: positions.length,
        positions
      }
    });
  } catch (error) {
    logger.error('Error getting user positions', { address: req.params.address, error: error.message });
    next(new AppError('Failed to retrieve user positions', 500));
  }
};

/**
 * Add liquidity to a pool
 * @route POST /api/meteora/pools/add-liquidity
 */
const addLiquidity = async (req, res, next) => {
  try {
    const { poolId, tokenA, tokenB, amountA, amountB, slippageTolerance, deadline } = req.body;
    const userAddress = req.user.address;
    
    const result = await meteoraService.addLiquidity({
      poolId,
      tokenA,
      tokenB,
      amountA,
      amountB,
      slippageTolerance,
      deadline,
      userAddress
    });
    
    res.status(201).json({
      status: 'success',
      data: {
        transactionHash: result.transactionHash,
        lpTokens: result.lpTokens,
        timestamp: result.timestamp
      }
    });
  } catch (error) {
    logger.error('Error adding liquidity', { 
      poolId: req.body.poolId, 
      userAddress: req.user.address, 
      error: error.message 
    });
    next(new AppError(`Failed to add liquidity: ${error.message}`, 500));
  }
};

/**
 * Remove liquidity from a pool
 * @route POST /api/meteora/pools/remove-liquidity
 */
const removeLiquidity = async (req, res, next) => {
  try {
    const { poolId, lpTokenAmount, minAmountA, minAmountB, deadline } = req.body;
    const userAddress = req.user.address;
    
    const result = await meteoraService.removeLiquidity({
      poolId,
      lpTokenAmount,
      minAmountA,
      minAmountB,
      deadline,
      userAddress
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        transactionHash: result.transactionHash,
        tokenAAmount: result.tokenAAmount,
        tokenBAmount: result.tokenBAmount,
        timestamp: result.timestamp
      }
    });
  } catch (error) {
    logger.error('Error removing liquidity', { 
      poolId: req.body.poolId, 
      userAddress: req.user.address, 
      error: error.message 
    });
    next(new AppError(`Failed to remove liquidity: ${error.message}`, 500));
  }
};

/**
 * Get user's rewards
 * @route GET /api/meteora/user/rewards
 */
const getUserRewards = async (req, res, next) => {
  try {
    const userAddress = req.user.address;
    const rewards = await meteoraService.getUserRewards(userAddress);
    
    res.status(200).json({
      status: 'success',
      data: {
        rewards
      }
    });
  } catch (error) {
    logger.error('Error getting user rewards', { 
      userAddress: req.user.address, 
      error: error.message 
    });
    next(new AppError('Failed to retrieve user rewards', 500));
  }
};

/**
 * Claim rewards from a pool
 * @route POST /api/meteora/pools/claim-rewards
 */
const claimRewards = async (req, res, next) => {
  try {
    const { poolId } = req.body;
    const userAddress = req.user.address;
    
    const result = await meteoraService.claimRewards({
      poolId,
      userAddress
    });
    
    res.status(200).json({
      status: 'success',
      data: {
        transactionHash: result.transactionHash,
        rewardAmount: result.rewardAmount,
        timestamp: result.timestamp
      }
    });
  } catch (error) {
    logger.error('Error claiming rewards', { 
      poolId: req.body.poolId, 
      userAddress: req.user.address, 
      error: error.message 
    });
    next(new AppError(`Failed to claim rewards: ${error.message}`, 500));
  }
};

module.exports = {
  getAllPools,
  getPoolById,
  getSupportedTokens,
  getUserPositions,
  addLiquidity,
  removeLiquidity,
  getUserRewards,
  claimRewards
};
