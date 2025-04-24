import dotenv from 'dotenv';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

// Import our LP routes
import lpRoutes from '../routes/lp';

// Load environment variables from .env file
dotenv.config();

const app: Express = express();

/**
 * Security and parsing middleware setup
 * - helmet: Adds various HTTP headers for security
 * - cors: Enables Cross-Origin Resource Sharing
 * - express.json: Parses JSON request bodies
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Rate limiting configuration
 * Prevents abuse by limiting requests from the same IP
 * Current limit: 100 requests per 15 minutes
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Register our LP routes under the /api/v1/lp prefix
app.use('/api/v1/lp', lpRoutes);

/**
 * Global error handling middleware
 * Catches any errors thrown in routes/controllers
 */
interface ErrorWithStack extends Error {
  stack?: string;
}

app.use((err: ErrorWithStack, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

/**
 * 404 handler for undefined routes
 * Must be registered last
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT: number = parseInt(process.env.PORT || '3000', 10);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app; 