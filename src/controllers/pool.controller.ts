import { Request, Response, NextFunction } from 'express';
import { pools } from '../data/mock-data';
import { PoolStats, OverviewStats } from '../models/pool.model';
import { 
  GetPoolInfoSchema, 
  GetPoolsByTokensSchema,
  AddLiquiditySchema,
  RemoveLiquiditySchema 
} from '../utils/validation';

// Get pool information
export const getPoolInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = GetPoolInfoSchema.safeParse({ poolAddress: req.params.poolAddress });
    
    if (!result.success) {
      res.status(400).json({
        success: false,
        requestId: req.id,
        message: 'Invalid request parameters',
        errors: result.error.format()
      });
      return;
    }

    const poolAddress = result.data.poolAddress;
    const poolData = pools.get(poolAddress);
    
    if (!poolData) {
      res.status(404).json({
        success: false,
        requestId: req.id,
        message: `Pool not found: ${poolAddress}`
      });
      return;
    }

    res.status(200).json({
      success: true,
      requestId: req.id,
      data: poolData
    });
  } catch (error) {
    next(error);
  }
};

// Get pools by token pair
export const getPoolsByTokens = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = GetPoolsByTokensSchema.safeParse({
      tokenAMint: req.query.tokenAMint,
      tokenBMint: req.query.tokenBMint
    });
    
    if (!result.success) {
      res.status(400).json({
        success: false,
        requestId: req.id,
        message: 'Invalid request parameters',
        errors: result.error.format()
      });
      return;
    }

    const tokenAMint = result.data.tokenAMint;
    const tokenBMint = result.data.tokenBMint;
    
    // Filter pools by tokens
    const matchingPools = Array.from(pools.values()).filter(pool => 
      (pool.tokenA.mint === tokenAMint && pool.tokenB.mint === tokenBMint) ||
      (pool.tokenA.mint === tokenBMint && pool.tokenB.mint === tokenAMint)
    );

    res.status(200).json({
      success: true,
      requestId: req.id,
      data: matchingPools
    });
  } catch (error) {
    next(error);
  }
};

// Get all pools
export const getAllPools = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    // Apply pagination
    const allPools = Array.from(pools.values());
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedPools = allPools.slice(startIndex, endIndex);

    // Return with pagination metadata
    res.status(200).json({
      success: true,
      requestId: req.id,
      data: {
        pools: paginatedPools,
        pagination: {
          totalItems: allPools.length,
          totalPages: Math.ceil(allPools.length / limit),
          currentPage: page,
          itemsPerPage: limit
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Add liquidity
export const addLiquidity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = AddLiquiditySchema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({
        success: false,
        requestId: req.id,
        message: 'Invalid request body',
        errors: result.error.format()
      });
      return;
    }

    const { poolAddress, tokenAAmount, tokenBAmount, userAddress } = result.data;
    
    // Verify pool exists
    if (!pools.has(poolAddress)) {
      res.status(404).json({
        success: false,
        requestId: req.id,
        message: `Pool not found: ${poolAddress}`
      });
      return;
    }

    // In a real implementation, this would create a transaction
    // For this example, we'll just return a simulated transaction ID
    const txId = `tx_add_liq_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;

    res.status(200).json({
      success: true,
      requestId: req.id,
      data: {
        poolAddress,
        tokenAAmount,
        tokenBAmount,
        userAddress,
        transactionId: txId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Remove liquidity
export const removeLiquidity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = RemoveLiquiditySchema.safeParse(req.body);
    
    if (!result.success) {
      res.status(400).json({
        success: false,
        requestId: req.id,
        message: 'Invalid request body',
        errors: result.error.format()
      });
      return;
    }

    const { poolAddress, positionAddress, liquidity, userAddress } = result.data;
    
    // Verify pool exists
    if (!pools.has(poolAddress)) {
      res.status(404).json({
        success: false,
        requestId: req.id,
        message: `Pool not found: ${poolAddress}`
      });
      return;
    }

    // In a real implementation, this would create a transaction
    // For this example, we'll just return a simulated transaction ID
    const txId = `tx_rem_liq_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;

    res.status(200).json({
      success: true,
      requestId: req.id,
      data: {
        poolAddress,
        positionAddress,
        liquidity,
        userAddress,
        transactionId: txId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get pool statistics
export const getPoolStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const result = GetPoolInfoSchema.safeParse({ poolAddress: req.params.poolAddress });
    
    if (!result.success) {
      res.status(400).json({
        success: false,
        requestId: req.id,
        message: 'Invalid request parameters',
        errors: result.error.format()
      });
      return;
    }

    const poolAddress = result.data.poolAddress;
    const poolData = pools.get(poolAddress);
    
    if (!poolData) {
      res.status(404).json({
        success: false,
        requestId: req.id,
        message: `Pool not found: ${poolAddress}`
      });
      return;
    }

    // In a real app, this would fetch historical data
    // For this example, we'll generate random stats
    const stats: PoolStats = {
      poolAddress,
      currentPrice: poolData.price,
      priceChange24h: ((Math.random() * 10) - 5).toFixed(2) + '%',
      volume: {
        '24h': poolData.volume24h,
        '7d': (parseFloat(poolData.volume24h) * 7 * (0.9 + Math.random() * 0.2)).toFixed(2)
      },
      tvl: (parseFloat(poolData.liquidity) / 1e9).toFixed(2),
      fees: {
        '24h': (parseFloat(poolData.volume24h) * (poolData.fee / 100)).toFixed(2),
        '7d': (parseFloat(poolData.volume24h) * (poolData.fee / 100) * 7 * (0.9 + Math.random() * 0.2)).toFixed(2)
      },
      apr: (Math.random() * 25 + 5).toFixed(2) + '%'
    };

    res.status(200).json({
      success: true,
      requestId: req.id,
      data: stats
    });
  } catch (error) {
    next(error);
  }
};

// Get overall protocol statistics
export const getOverviewStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // In a real app, this would calculate stats from all pools
    // For this example, we'll generate simulated data
    const overview: OverviewStats = {
      totalPools: pools.size,
      totalTVL: Array.from(pools.values())
        .reduce((sum, pool) => sum + parseFloat(pool.liquidity), 0) / 1e9,
      volume24h: Array.from(pools.values())
        .reduce((sum, pool) => sum + parseFloat(pool.volume24h), 0),
      totalUsers: 1250 + Math.floor(Math.random() * 200),
      topPools: Array.from(pools.values())
        .sort((a, b) => parseFloat(b.volume24h) - parseFloat(a.volume24h))
        .slice(0, 3)
        .map(pool => ({
          address: pool.address,
          pair: `${pool.tokenA.symbol}/${pool.tokenB.symbol}`,
          volume24h: pool.volume24h
        }))
    };

    res.status(200).json({
      success: true,
      requestId: req.id,
      data: overview
    });
  } catch (error) {
    next(error);
  }
};