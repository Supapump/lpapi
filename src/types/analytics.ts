import { Request } from 'express';

export interface VolumeHistoryEntry {
  date: string;
  volume: string;
  trades: number;
}

export interface VolumeHistoryResponse {
  timeframe: string;
  data: VolumeHistoryEntry[];
  totalVolume: string;
  totalTrades: number;
}

export interface PoolAprResponse {
  poolId: string;
  apr: string;
  apy: string;
  dailyFees: string;
  weeklyFees: string;
  stakingRewards: string;
}

export interface TopPool {
  id: string;
  tvl: string;
  share: string;
}

export interface TvlResponse {
  totalTvl: string;
  change24h: string;
  change7d: string;
  topPools: TopPool[];
}

export interface VolumeData {
  "24h": string;
  "7d": string;
  "30d": string;
}

export interface AprData {
  current: string;
  "7dAverage": string;
  "30dAverage": string;
}

export interface ImpermanentLossData {
  "24h": string;
  "7d": string;
  "30d": string;
}

export interface PriceHistoryData {
  current: string;
  "24hChange": string;
  "7dChange": string;
  "30dChange": string;
}

export interface PoolMetrics {
  tvl: string;
  volume: VolumeData;
  fees: VolumeData;
  apr: AprData;
  impermanentLoss: ImpermanentLossData;
}

export interface PoolMetricsResponse {
  poolId: string;
  metrics: PoolMetrics;
  priceHistory: PriceHistoryData;
}

export interface PoolMetricsRequest extends Request {
  params: {
    poolId: string;
  };
}

export interface DateRangeRequest extends Request {
  query: {
    startDate?: string;
    endDate?: string;
  };
} 