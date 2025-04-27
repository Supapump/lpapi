import { Router } from 'express';
import { getUserPositions } from '../controllers/position.controller';

const router = Router();

router.get('/:userAddress', getUserPositions);

export default router;