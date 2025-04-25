const solanaService = require('../services/solanaService');
const logger = require('../utils/logger');
const ApiError = require('../utils/ApiError');

/**
 * Controller for pool-related operations
 */
const poolController = {
  /**
   * Get all liquidity pools
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getAllPools: async (req, res, next) => {
    try {
      logger.debug('Processing request to get all pools');
      
      const pools = await solanaService.getAllPools();
      
      return res.status(200).json({
        status: 'success',
        data: {
          count: pools.length,
          pools: pools.map(pool => pool.toJSON())
        }
      });
    } catch (error) {
      logger.error('Error in getAllPools controller:', error);
      return next(new ApiError(error.message, 500));
    }
  },
  
  /**
   * Get details for a specific pool
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getPoolById: async (req, res, next) => {
    try {
      const { poolId } = req.params;
      logger.debug(`Processing request to get pool ${poolId}`);
      
      if (!poolId || poolId.length < 32 || poolId.length > 44) {
        return next(new ApiError('Invalid pool ID format', 400));
      }
      
      const pool = await solanaService.getPoolById(poolId);
      
      return res.status(200).json({
        status: 'success',
        data: {
          pool: pool.toJSON()
        }
      });
    } catch (error) {
      logger.error(`Error in getPoolById controller for ${req.params.poolId}:`, error);
      
      if (error.message.includes('not found')) {
        return next(new ApiError('Pool not found', 404));
      }
      
      return next(new ApiError(error.message, 500));
    }
  },
  
  /**
   * Get positions for a specific user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  getUserPositions: async (req, res, next) => {
    try {
      const { address } = req.params;
      logger.debug(`Processing request to get positions for user ${address}`);
      
      if (!address || address.length < 32 || address.length > 44) {
        return next(new ApiError('Invalid address format', 400));
      }
      
      const positions = await solanaService.getUserPositions(address);
      
      return res.status(200).json({
        status: 'success',
        data: {
          count: positions.length,
          positions: positions.map(position => position.toJSON())
        }
      });
    } catch (error) {
      logger.error(`Error in getUserPositions controller for ${req.params.address}:`, error);
      return next(new ApiError(error.message, 500));
    }
  },
  
  /**
   * Add liquidity to a pool
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  addLiquidity: async (req, res, next) => {
    try {
      const { poolId, tokenA, tokenB, amountA, amountB, slippageTolerance, deadline, userAddress } = req.body;
      logger.debug(`Processing request to add liquidity to pool ${poolId}`);
      
      // Validate required fields
      if (!poolId || !tokenA || !tokenB || !amountA || !amountB || !deadline || !userAddress) {
        return next(new ApiError('Missing required fields', 400));
      }
      
      // In a full implementation, this would call a blockchain service to add liquidity
      // For this implementation, we simulate the response
      
      // First confirm the pool exists
      const pool = await solanaService.getPoolById(poolId);
      
      // Create a unique transaction hash
      const transactionHash = "tx_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
      
      return res.status(201).json({
        status: 'success',
        data: {
          transactionHash,
          lpTokens: "1000000000",
          timestamp: Math.floor(Date.now() / 1000)
        }
      });
    } catch (error) {
      logger.error(`Error in addLiquidity controller:`, error);
      return next(new ApiError(error.message, 500));
    }
  },
  
  /**
   * Remove liquidity from a pool
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  removeLiquidity: async (req, res, next) => {
    try {
      const { poolId, lpTokenAmount, minAmountA, minAmountB, deadline, userAddress } = req.body;
      logger.debug(`Processing request to remove liquidity from pool ${poolId}`);
      
      // Validate required fields
      if (!poolId || !lpTokenAmount || !minAmountA || !minAmountB || !deadline || !userAddress) {
        return next(new ApiError('Missing required fields', 400));
      }
      
      // In a full implementation, this would call a blockchain service to remove liquidity
      // For this implementation, we simulate the response
      
      // First confirm the pool exists
      const pool = await solanaService.getPoolById(poolId);
      
      // Create a unique transaction hash
      const transactionHash = "tx_" + Date.now().toString(36) + Math.random().toString(36).substring(2, 15);
      
      return res.status(200).json({
        status: 'success',
        data: {
          transactionHash,
          tokenAAmount: minAmountA,
          tokenBAmount: minAmountB,
          timestamp: Math.floor(Date.now() / 1000)
        }
      });
    } catch (error) {
      logger.error(`Error in removeLiquidity controller:`, error);
      return next(new ApiError(error.message, 500));
    }
  }
};

module.exports = poolController;
