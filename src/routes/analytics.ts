import express, { Response } from 'express';
import { validateDateRange } from '../middleware/validators';
import {
  DateRangeRequest,
  VolumeHistoryResponse,
  PoolAprResponse,
  TvlResponse,
  PoolMetricsRequest,
  PoolMetricsResponse
} from '../types/analytics';

const router = express.Router();

// Get historical volume data with time range
router.get('/volume/history', validateDateRange, (req: DateRangeRequest, res: Response) => {
  const response: VolumeHistoryResponse = {
    timeframe: 'daily',
    data: [
      {
        date: '2024-02-01',
        volume: '125000',
        trades: 450
      },
      {
        date: '2024-02-02',
        volume: '142000',
        trades: 525
      }
    ],
    totalVolume: '2670000',
    totalTrades: 9875
  };
  res.json(response);
});

// Get APR/APY statistics for a pool
router.get('/pool/:poolId/apr', (req: PoolMetricsRequest, res: Response) => {
  const { poolId } = req.params;
  const response: PoolAprResponse = {
    poolId,
    apr: '12.5',
    apy: '13.2',
    dailyFees: '225',
    weeklyFees: '1575',
    stakingRewards: '2.5'
  };
  res.json(response);
});

// Get total value locked (TVL) across all pools or specific pool
router.get('/tvl', (_req: DateRangeRequest, res: Response) => {
  const response: TvlResponse = {
    totalTvl: '15000000',
    change24h: '+2.5%',
    change7d: '+5.2%',
    topPools: [
      { id: 'pool_123', tvl: '1500000', share: '10%' },
      { id: 'pool_456', tvl: '1200000', share: '8%' }
    ]
  };
  res.json(response);
});

// Get pool performance metrics
router.get('/pool/:poolId/metrics', (req: PoolMetricsRequest, res: Response) => {
  const { poolId } = req.params;
  
  const response: PoolMetricsResponse = {
    poolId,
    metrics: {
      tvl: '1500000',
      volume: {
        '24h': '75000',
        '7d': '525000',
        '30d': '2250000'
      },
      fees: {
        '24h': '225',
        '7d': '1575',
        '30d': '6750'
      },
      apr: {
        current: '12.5',
        '7dAverage': '11.8',
        '30dAverage': '11.2'
      },
      impermanentLoss: {
        '24h': '-0.2',
        '7d': '-0.8',
        '30d': '-1.5'
      }
    },
    priceHistory: {
      current: '20.1',
      '24hChange': '+2.5%',
      '7dChange': '+5.2%',
      '30dChange': '+12.8%'
    }
  };

  res.json(response);
});

export default router; 