import { Router } from 'express';
import healthRoutes from './health.route';
import poolRoutes from './pool.route';
import positionRoutes from './position.route';
import statsRoutes from './stats.route'

const router = Router();

router.use('/health', healthRoutes);
router.use('/pools', poolRoutes);
router.use('/positions', positionRoutes);
router.use('/stats',statsRoutes);

export default router;