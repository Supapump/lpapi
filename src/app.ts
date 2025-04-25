import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import compression from 'compression';

// Import our LP routes and middleware
import lpRoutes from './routes/lp';
import { requestLogger } from './middleware/logger';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();

/**
 * Security and parsing middleware setup
 * - helmet: Adds various HTTP headers for security
 * - cors: Enables Cross-Origin Resource Sharing
 * - express.json: Parses JSON request bodies
 * - compression: Compresses response bodies
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());

// Add request logging
app.use(requestLogger);

/**
 * Rate limiting configuration
 * Prevents abuse by limiting requests from the same IP
 * Current limit: 100 requests per 15 minutes
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Register our LP routes under the /api/v1/lp prefix
app.use('/api/v1/lp', lpRoutes);

/**
 * Global error handling middleware
 * Catches any errors thrown in routes/controllers
 */
interface ErrorWithStatus extends Error {
  status?: number;
  stack?: string;
}

app.use((err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      error: 'Validation Error',
      details: err.message 
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ 
      error: 'Unauthorized',
      details: 'Invalid or missing authentication token'
    });
  }

  // Default error response
  res.status(err.status || 500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message
  });
});

/**
 * 404 handler for undefined routes
 * Must be registered last
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`
  });
});

// Start the server
const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app; 