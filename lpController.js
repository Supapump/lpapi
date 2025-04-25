const { fetchLPData, getCachedPools } = require('../services/meteoraService');

const getLPInfo = async (req, res) => {
  const { poolId } = req.params;
  try {
    const data = await fetchLPData(poolId);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllPools = async (_req, res) => {
  try {
    const allPools = getCachedPools();
    res.json({ success: true, pools: allPools });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getLPInfo, getAllPools };
