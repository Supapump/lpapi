import { Request, Response } from 'express';
import { env } from '../config/env';

export const healthCheck = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    requestId: req.id,
    message: 'Meteora LP API is operational',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV
  });
};