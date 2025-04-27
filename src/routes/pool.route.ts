import { Router } from 'express';
import {
  getPoolInfo,
  getPoolsByTokens,
  getAllPools,
  addLiquidity,
  removeLiquidity,
} from '../controllers/pool.controller';

const router = Router();


router.get('/all', getAllPools);
router.get('/', getPoolsByTokens);
router.post('/add-liquidity', addLiquidity);
router.post('/remove-liquidity', removeLiquidity);
router.get('/:poolAddress', getPoolInfo);


export default router;