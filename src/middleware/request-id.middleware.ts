import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';

export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  req.id = uuidv4();
  res.setHeader('X-Request-ID', req.id);
  next();
};

// Extend Express Request interface to include id property
declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}