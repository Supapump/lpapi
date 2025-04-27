import { Request, Response, NextFunction } from 'express';
import { positions } from '../data/mock-data';

export const getUserPositions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userAddress = req.params.userAddress;
    
    // Validate user address format
    if (!/^[A-Za-z0-9]{32,44}$/.test(userAddress)) {
      res.status(400).json({
        success: false,
        requestId: req.id,
        message: 'Invalid user address format'
      });
      return;
    }

    // Fetch user positions
    const userPositions = positions.get(userAddress) || [];

    res.status(200).json({
      success: true,
      requestId: req.id,
      data: {
        userAddress,
        positions: userPositions
      }
    });
  } catch (error) {
    next(error);
  }
};