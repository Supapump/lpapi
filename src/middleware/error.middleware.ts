import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  console.error(`[Error][ReqID: ${req.id}]:`, err.message);
  
  res.status(500).json({
    success: false,
    requestId: req.id,
    message: 'Internal server error',
    error: env.NODE_ENV === 'development' ? err.message : undefined
  });
};