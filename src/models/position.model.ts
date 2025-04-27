export interface PositionToken {
    mint: string;
    symbol: string;
    amount: string;
  }
  
  export interface Position {
    positionId: string;
    poolAddress: string;
    tokenA: PositionToken;
    tokenB: PositionToken;
    liquidity: string;
    apr: string;
  }