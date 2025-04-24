const meteoraService = require('../services/meteoraService');

// Controller for Meteora LP operations
const lpController = {
  // Get all liquidity pools
  getAllPools: async (req, res) => {
    try {
      const pools = await meteoraService.fetchAllPools();
      res.status(200).json({ success: true, data: pools });
    } catch (error) {
      console.error('Error fetching pools:', error);
      res.status(500).json({ success: false, error: 'Failed to fetch pools' });
    }
  },

  // Get specific pool by ID
  getPoolById: async (req, res) => {
    try {
      const { id } = req.params;
      const pool = await meteoraService.fetchPoolById(id);
      
      if (!pool) {
        return res.status(404).json({ success: false, error: 'Pool not found' });
      }
      
      res.status(200).json({ success: true, data: pool });
    } catch (error) {
      console.error(`Error fetching pool ${req.params.id}:`, error);
      res.status(500).json({ success: false, error: 'Failed to fetch pool' });
    }
  },

  // Get user's liquidity positions
  getUserPositions: async (req, res) => {
    try {
      const { address } = req.params;
      const positions = await meteoraService.fetchUserPositions(address);
      res.status(200).json({ success: true, data: positions });
    } catch (error) {
      console.error(`Error fetching positions for ${req.params.address}:`, error);
      res.status(500).json({ success: false, error: 'Failed to fetch positions' });
    }
  },

  // Add liquidity to a pool
  addLiquidity: async (req, res) => {
    try {
      const { poolId, tokenAmounts, slippage, userAddress } = req.body;
      
      if (!poolId || !tokenAmounts || !userAddress) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required parameters: poolId, tokenAmounts, userAddress' 
        });
      }
      
      const result = await meteoraService.addLiquidity(poolId, tokenAmounts, slippage, userAddress);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      console.error('Error adding liquidity:', error);
      res.status(500).json({ success: false, error: 'Failed to add liquidity' });
    }
  },

  // Remove liquidity from a pool
  removeLiquidity: async (req, res) => {
    try {
      const { poolId, lpAmount, minAmountsOut, userAddress } = req.body;
      
      if (!poolId || !lpAmount || !userAddress) {
        return res.status(400).json({ 
          success: false, 
          error: 'Missing required parameters: poolId, lpAmount, userAddress' 
        });
      }
      
      const result = await meteoraService.removeLiquidity(poolId, lpAmount, minAmountsOut, userAddress);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      console.error('Error removing liquidity:', error);
      res.status(500).json({ success: false, error: 'Failed to remove liquidity' });
    }
  }
};

module.exports = lpController;