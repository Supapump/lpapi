const express = require('express');
const router = express.Router();
const lpController = require('../controllers/lpController');
const auth = require('../middleware/auth');

router.get('/all', lpController.getAllPools)
      .get('/by-tokens', lpController.getPoolByTokens)
      .get('/info/:poolAddress', lpController.getPoolByAddress)
      .post('/add-liquidity', auth, lpController.addLiquidity)
      .post('/remove-liquidity', auth, lpController.removeLiquidity)

module.exports = router;
