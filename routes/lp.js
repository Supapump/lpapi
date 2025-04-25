const express = require('express');
const { body, validationResult } = require('express-validator');
const { getAllPools, addLiquidity, removeLiquidity } = require('../services/meteora');
const router = express.Router();

/**
 * @route GET /pools
 * @desc Get all available liquidity pools
 * @access Public
 */
router.get('/pools', async (req, res) => {
  try {
    const pools = await getAllPools();
    res.success(pools, 'Pools retrieved successfully');
  } catch (err) {
    res.error(err.message, 500);
  }
});

/**
 * @route POST /add
 * @desc Add liquidity to a pool
 * @access Public
 */
router.post('/add', [
  body('wallet').isString().withMessage('Wallet address is required'),
  body('tokenA').isString().withMessage('Token A is required'),
  body('tokenB').isString().withMessage('Token B is required'),
  body('amountA').isNumeric().withMessage('Amount A must be a number'),
  body('amountB').isNumeric().withMessage('Amount B must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error(errors.array()[0].msg, 400);
  }

  try {
    const result = await addLiquidity(req.body);
    res.success(result, 'Liquidity added successfully');
  } catch (err) {
    res.error(err.message, 500);
  }
});

/**
 * @route POST /remove
 * @desc Remove liquidity from a pool
 * @access Public
 */
router.post('/remove', [
  body('wallet').isString().withMessage('Wallet address is required'),
  body('lpToken').isString().withMessage('LP token is required'),
  body('amount').isNumeric().withMessage('Amount must be a number')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.error(errors.array()[0].msg, 400);
  }

  try {
    const result = await removeLiquidity(req.body);
    res.success(result, 'Liquidity removed successfully');
  } catch (err) {
    res.error(err.message, 500);
  }
});

module.exports = router;
