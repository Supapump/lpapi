import { body, query, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateLPRequest = [
  body('lpId')
    .trim()
    .notEmpty()
    .withMessage('LP ID is required'),
  body('tokenA')
    .trim()
    .notEmpty()
    .withMessage('Token A address is required')
    .matches(/^[A-HJ-NP-Za-km-z1-9]*$/)
    .withMessage('Invalid token A address format')
    .isLength({ min: 32, max: 44 })
    .withMessage('Token A address must be between 32 and 44 characters'),
  body('tokenB')
    .trim()
    .notEmpty()
    .withMessage('Token B address is required')
    .matches(/^[A-HJ-NP-Za-km-z1-9]*$/)
    .withMessage('Invalid token B address format')
    .isLength({ min: 32, max: 44 })
    .withMessage('Token B address must be between 32 and 44 characters'),
  body('amountA')
    .notEmpty()
    .withMessage('Amount A is required')
    .isNumeric()
    .withMessage('Amount A must be a number'),
  body('amountB')
    .notEmpty()
    .withMessage('Amount B is required')
    .isNumeric()
    .withMessage('Amount B must be a number'),
  body('userAddress')
    .trim()
    .notEmpty()
    .withMessage('User address is required')
    .matches(/^[A-HJ-NP-Za-km-z1-9]*$/)
    .withMessage('Invalid user address format')
    .isLength({ min: 32, max: 44 })
    .withMessage('User address must be between 32 and 44 characters'),
  body('slippageTolerance')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Slippage tolerance must be between 0 and 100'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateDateRange = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),
  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date')
    .custom((endDate, { req }) => {
      const startDate = req.query?.startDate as string | undefined;
      if (endDate && startDate && endDate <= startDate) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const validateTokenAddress = [
  param('tokenAddress')
    .trim()
    .notEmpty()
    .withMessage('Token address is required')
    .matches(/^[A-HJ-NP-Za-km-z1-9]*$/)
    .withMessage('Invalid token address format')
    .isLength({ min: 32, max: 44 })
    .withMessage('Token address must be between 32 and 44 characters'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]; 