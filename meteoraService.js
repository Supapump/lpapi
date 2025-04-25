const { Connection, PublicKey } = require('@solana/web3.js');
const { getAccount, getMint } = require('@solana/spl-token');
const { loadAllPools } = require('./meteoraRegistry');
const { getTokenMetadata } = require('./tokenMetadata');

const RPC_URL = 'https://api.mainnet-beta.solana.com';
let POOL_CACHE = [];

const preloadPools = async () => {
  POOL_CACHE = await loadAllPools();
};

const getCachedPools = () => POOL_CACHE;

const findPoolByLpMint = (lpMintStr) => {
  return POOL_CACHE.find((pool) => pool.lpMint === lpMintStr);
};

const fetchLPData = async (lpMintStr) => {
  const connection = new Connection(RPC_URL);
  const pool = findPoolByLpMint(lpMintStr);
  if (!pool) throw new Error('Pool not found');

  const reserveAInfo = await getAccount(connection, new PublicKey(pool.tokenA.reserve));
  const reserveBInfo = await getAccount(connection, new PublicKey(pool.tokenB.reserve));
  const tokenAMintInfo = await getMint(connection, new PublicKey(pool.tokenA.mint));
  const tokenBMintInfo = await getMint(connection, new PublicKey(pool.tokenB.mint));
  const lpMintInfo = await getMint(connection, new PublicKey(lpMintStr));

  const tokenAmeta = getTokenMetadata(pool.tokenA.mint);
  const tokenBmeta = getTokenMetadata(pool.tokenB.mint);

  return {
    poolId: lpMintStr,
    lpSupply: Number(lpMintInfo.supply) / 10 ** lpMintInfo.decimals,
    tokenA: {
      ...pool.tokenA,
      ...tokenAmeta,
      balance: Number(reserveAInfo.amount) / 10 ** tokenAMintInfo.decimals,
    },
    tokenB: {
      ...pool.tokenB,
      ...tokenBmeta,
      balance: Number(reserveBInfo.amount) / 10 ** tokenBMintInfo.decimals,
    }
  };
};

module.exports = { preloadPools, fetchLPData, getCachedPools };
