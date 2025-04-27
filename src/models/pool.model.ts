export interface TokenInfo {
    mint: string;
    symbol: string;
    decimals: number;
    balance: string;
  }
  
  export interface Pool {
    address: string;
    tokenA: TokenInfo;
    tokenB: TokenInfo;
    liquidity: string;
    price: string;
    volume24h: string;
    fee: number;
  }
  
  export interface PoolStats {
    poolAddress: string;
    currentPrice: string;
    priceChange24h: string;
    volume: {
      '24h': string;
      '7d': string;
    };
    tvl: string;
    fees: {
      '24h': string;
      '7d': string;
    };
    apr: string;
  }
  
  export interface OverviewStats {
    totalPools: number;
    totalTVL: number;
    volume24h: number;
    totalUsers: number;
    topPools: {
      address: string;
      pair: string;
      volume24h: string;
    }[];
  }