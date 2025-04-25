const meteoraService = require('../services/meteora');
const { buildAddLiquidityTx, buildRemoveLiquidityTx } = meteoraService;

async function addLiquidity(req, res) {
  const { wallet, tokenA, tokenB, amountA, amountB } = req.body;

  if (!wallet || !tokenA || !tokenB || !amountA || !amountB) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const tx = await buildAddLiquidityTx(wallet, tokenA, tokenB, amountA, amountB);
    res.json({ transaction: tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function removeLiquidity(req, res) {
  const { wallet, lpMint, amount } = req.body;

  if (!wallet || !lpMint || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const tx = await buildRemoveLiquidityTx(wallet, lpMint, amount);
    res.json({ transaction: tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


async function getAllPools(req, res) {
  try {
    const pools = await meteoraService.getAllPools();
    res.json(pools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



async function getPoolByTokens(req, res) {
  const { tokenA, tokenB } = req.query;

  if (!tokenA || !tokenB) {
    return res.status(400).json({ error: 'tokenA and tokenB are required' });
  }

  try {
    const pool = await meteoraService.getPoolByTokens(tokenA, tokenB);
    if (!pool) {
      return res.status(404).json({ error: 'Pool not found' });
    }
    res.json(pool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}



async function getPoolByAddress(req, res) {
  const { poolAddress } = req.params;
  try {
    const pool = await meteoraService.getPoolByAddress(poolAddress);
    if (!pool) {
      return res.status(404).json({ error: 'Pool not found' });
    }
    res.json(pool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addLiquidity,
  removeLiquidity,
  getAllPools,
  getPoolByTokens,
  getPoolByAddress,
};
