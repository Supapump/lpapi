import { Pool } from '../models/pool.model';
import { Position } from '../models/position.model';

// Dummy Pool data for testing purpose
const pools = new Map<string, Pool>();

pools.set("2QdhepnKRTLjjSqPL1PtKNwqrUkoLee5Gqs8bvZhRdMv", {
  address: "2QdhepnKRTLjjSqPL1PtKNwqrUkoLee5Gqs8bvZhRdMv",
  tokenA: {
    mint: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    decimals: 9,
    balance: "1000000000000"
  },
  tokenB: {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    decimals: 6,
    balance: "5000000000"
  },
  liquidity: "25000000000000",
  price: "20.34",
  volume24h: "12500000",
  fee: 0.25
});

pools.set("HVNwzt7Pxfu76KHCMQPTLuTCLTm6WnQ1esLv4eizseSv", {
  address: "HVNwzt7Pxfu76KHCMQPTLuTCLTm6WnQ1esLv4eizseSv",
  tokenA: {
    mint: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    decimals: 9,
    balance: "2000000000000"
  },
  tokenB: {
    mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    symbol: "BONK",
    decimals: 5,
    balance: "10000000000000"
  },
  liquidity: "15000000000000",
  price: "0.00001855",
  volume24h: "8700000",
  fee: 0.3
});

// User positions data
const positions = new Map<string, Position[]>();

positions.set("5VZa58QdwEj1L8HdxKzEtDENN8n6KhJom3JRwzyB53w5", [
  {
    positionId: "position1",
    poolAddress: "2QdhepnKRTLjjSqPL1PtKNwqrUkoLee5Gqs8bvZhRdMv",
    tokenA: {
      mint: "So11111111111111111111111111111111111111112",
      symbol: "SOL",
      amount: "15.5"
    },
    tokenB: {
      mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
      symbol: "USDC",
      amount: "315.27"
    },
    liquidity: "310000000000",
    apr: "12.5"
  },
  {
    positionId: "position2",
    poolAddress: "HVNwzt7Pxfu76KHCMQPTLuTCLTm6WnQ1esLv4eizseSv",
    tokenA: {
      mint: "So11111111111111111111111111111111111111112",
      symbol: "SOL",
      amount: "10.0"
    },
    tokenB: {
      mint: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
      symbol: "BONK",
      amount: "810000"
    },
    liquidity: "123400000000",
    apr: "18.7"
  }
]);

export { pools, positions };
