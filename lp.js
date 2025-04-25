const express = require('express');
const router = express.Router();
const { getLPInfo, getAllPools } = require('../controllers/lpController');

/**
 * @swagger
 * /lp:
 *   get:
 *     summary: List all LP pools
 *     responses:
 *       200:
 *         description: Array of LP pools
 */

/**
 * @swagger
 * /lp/{poolId}:
 *   get:
 *     summary: Get detailed LP info for a given pool
 *     parameters:
 *       - in: path
 *         name: poolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: LP details with balances and metadata
 */
router.get('/:poolId', getLPInfo);
router.get('/', getAllPools);

module.exports = router;
