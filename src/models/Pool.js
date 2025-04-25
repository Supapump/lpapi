/**
 * Pool model representing a Meteora Liquidity Pool
 */
class Pool {
  constructor(data = {}) {
    this.poolId = data.poolId || '';
    this.lpTokenMint = data.lpTokenMint || '';
    this.tokenA = data.tokenA || {
      address: '',
      symbol: '',
      decimals: 0,
      reserve: '0'
    };
    this.tokenB = data.tokenB || {
      address: '',
      symbol: '',
      decimals: 0,
      reserve: '0'
    };
    this.totalSupply = data.totalSupply || '0';
    this.swapFee = data.swapFee || 0.003;
    this.tvl = data.tvl || '0';
    this.apr = data.apr || '0';
    this.lastUpdated = data.lastUpdated || Date.now();
  }

  toJSON() {
    return {
      poolId: this.poolId,
      lpTokenMint: this.lpTokenMint,
      tokenA: this.tokenA,
      tokenB: this.tokenB,
      totalSupply: this.totalSupply,
      swapFee: this.swapFee,
      tvl: this.tvl,
      apr: this.apr,
      lastUpdated: this.lastUpdated
    };
  }
}

module.exports = Pool;
