const express = require('express');
const poolController = require('../controllers/poolController');
const authMiddleware = require('../middlewares/authMiddleware');
const rateLimitMiddleware = require('../middlewares/rateLimitMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/v1/pools:
 *   get:
 *     summary: Get all Meteora liquidity pools
 *     description: Retrieves a list of all available Meteora liquidity pools with their details
 *     tags: [Pools]
 *     responses:
 *       200:
 *         description: A list of liquidity pools
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 10
 *                     pools:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Pool'
 *       500:
 *         description: Server error
 */
router.get('/pools', rateLimitMiddleware, poolController.getAllPools);

/**
 * @swagger
 * /api/v1/pools/{poolId}:
 *   get:
 *     summary: Get details for a specific pool
 *     description: Retrieves detailed information about a specific Meteora liquidity pool
 *     tags: [Pools]
 *     parameters:
 *       - in: path
 *         name: poolId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the liquidity pool
 *     responses:
 *       200:
 *         description: Pool details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     pool:
 *                       $ref: '#/components/schemas/Pool'
 *       404:
 *         description: Pool not found
 *       500:
 *         description: Server error
 */
router.get('/pools/:poolId', rateLimitMiddleware, poolController.getPoolById);

/**
 * @swagger
 * /api/v1/positions/{address}:
 *   get:
 *     summary: Get user positions
 *     description: Retrieves all liquidity positions for a specific user address
 *     tags: [Positions]
 *     parameters:
 *       - in: path
 *         name: address
 *         required: true
 *         schema:
 *           type: string
 *         description: Solana wallet address
 *     responses:
 *       200:
 *         description: User positions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                       example: 2
 *                     positions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Position'
 *       400:
 *         description: Invalid address format
 *       500:
 *         description: Server error
 */
router.get('/positions/:address', rateLimitMiddleware, poolController.getUserPositions);

/**
 * @swagger
 * /api/v1/liquidity/add:
 *   post:
 *     summary: Add liquidity to a pool
 *     description: Adds liquidity to a specified Meteora pool
 *     tags: [Liquidity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - poolId
 *               - tokenA
 *               - tokenB
 *               - amountA
 *               - amountB
 *               - slippageTolerance
 *               - deadline
 *               - userAddress
 *             properties:
 *               poolId:
 *                 type: string
 *                 description: ID of the liquidity pool
 *               tokenA:
 *                 type: string
 *                 description: Token A address
 *               tokenB:
 *                 type: string
 *                 description: Token B address
 *               amountA:
 *                 type: string
 *                 description: Amount of token A to add
 *               amountB:
 *                 type: string
 *                 description: Amount of token B to add
 *               slippageTolerance:
 *                 type: number
 *                 description: Acceptable slippage percentage (0.01 = 1%)
 *               deadline:
 *                 type: integer
 *                 description: Transaction deadline timestamp (in seconds)
 *               userAddress:
 *                 type: string
 *                 description: User's wallet address
 *     responses:
 *       201:
 *         description: Liquidity added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactionHash:
 *                       type: string
 *                       example: tx_12345abcde
 *                     lpTokens:
 *                       type: string
 *                       example: "1000000000"
 *                     timestamp:
 *                       type: integer
 *                       example: 1649870400
 *       400:
 *         description: Missing or invalid parameters
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/liquidity/add', rateLimitMiddleware, authMiddleware, poolController.addLiquidity);

/**
 * @swagger
 * /api/v1/liquidity/remove:
 *   post:
 *     summary: Remove liquidity from a pool
 *     description: Removes liquidity from a specified Meteora pool
 *     tags: [Liquidity]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - poolId
 *               - lpTokenAmount
 *               - minAmountA
 *               - minAmountB
 *               - deadline
 *               - userAddress
 *             properties:
 *               poolId:
 *                 type: string
 *                 description: ID of the liquidity pool
 *               lpTokenAmount:
 *                 type: string
 *                 description: Amount of LP tokens to burn
 *               minAmountA:
 *                 type: string
 *                 description: Minimum amount of token A to receive
 *               minAmountB:
 *                 type: string
 *                 description: Minimum amount of token B to receive
 *               deadline:
 *                 type: integer
 *                 description: Transaction deadline timestamp (in seconds)
 *               userAddress:
 *                 type: string
 *                 description: User's wallet address
 *     responses:
 *       200:
 *         description: Liquidity removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactionHash:
 *                       type: string
 *                       example: tx_12345abcde
 *                     tokenAAmount:
 *                       type: string
 *                       example: "500000000"
 *                     tokenBAmount:
 *                       type: string
 *                       example: "1000000000"
 *                     timestamp:
 *                       type: integer
 *                       example: 1649870400
 *       400:
 *         description: Missing or invalid parameters
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/liquidity/remove', rateLimitMiddleware, authMiddleware, poolController.removeLiquidity);

module.exports = router;
