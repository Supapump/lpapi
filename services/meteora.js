const axios = require('axios');
const { Connection, Transaction, PublicKey } = require('@solana/web3.js');

async function getAllPools() {
  const response = await axios.get('https://devnet.meteora.ag/pools');
  return response.data;
}

async function getPoolByTokens(tokenA, tokenB) {
  const pools = await getAllPools();
  return pools.find(pool => {
    const mints = pool.pool_token_mints;
    return (mints[0] === tokenA && mints[1] === tokenB) || (mints[1] === tokenA && mints[0] === tokenB);
  });
}

async function getPoolByAddress(poolAddress) {
  const pools = await getAllPools();
  return pools.find(pool => pool.pool_address === poolAddress);
}

async function buildAddLiquidityTx(wallet, tokenA, tokenB, amountA, amountB) {
  const connection = new Connection('https://api.devnet.solana.com');
  const transaction = new Transaction();
  
  // Add logic to build actual liquidity adding instructions using Solana Web3.j
  const ix = await buildAddLiquidityInstruction(connection, wallet, tokenA, tokenB, amountA, amountB);
  transaction.add(ix);
  
  return transaction;
}


async function buildRemoveLiquidityTx(wallet, lpMint, amount) {
  const connection = new Connection('https://api.devnet.solana.com');
  const transaction = new Transaction();
  
  
  const ix = await buildRemoveLiquidityInstruction(connection, wallet, lpMint, amount);
  transaction.add(ix);

  return transaction;
}

module.exports = {
  getAllPools,
  getPoolByTokens,
  getPoolByAddress,
  buildAddLiquidityTx,
  buildRemoveLiquidityTx,
};
