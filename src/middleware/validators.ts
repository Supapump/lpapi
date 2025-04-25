import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateLPRequest = [
  body('lpId').trim().notEmpty().withMessage('LP ID is required'),
  body('amount').isNumeric().withMessage('Amount must be a number'),
  body('currency').trim().notEmpty().withMessage('Currency is required'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 