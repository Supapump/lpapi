/**
 * Position model representing a user's position in a Meteora Liquidity Pool
 */
class Position {
  constructor(data = {}) {
    this.poolId = data.poolId || '';
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
    this.lpTokenBalance = data.lpTokenBalance || '0';
    this.poolShare = data.poolShare || '0.0';
    this.valueA = data.valueA || '0';
    this.valueB = data.valueB || '0';
    this.addedAt = data.addedAt || Math.floor(Date.now() / 1000);
  }

  toJSON() {
    return {
      poolId: this.poolId,
      tokenA: this.tokenA,
      tokenB: this.tokenB,
      lpTokenBalance: this.lpTokenBalance,
      poolShare: this.poolShare,
      valueA: this.valueA,
      valueB: this.valueB,
      addedAt: this.addedAt
    };
  }
}

module.exports = Position;
