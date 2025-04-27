import { Router } from 'express';
import {
  getPoolStats,
  getOverviewStats
} from '../controllers/pool.controller';

const router = Router();

// Overview of all pools
router.get('/overview', getOverviewStats);

// Stats for a single pool
router.get('/:poolAddress', getPoolStats);

export default router;
