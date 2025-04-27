import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler } from './middleware/error.middleware';
import { requestIdMiddleware } from './middleware/request-id.middleware';
import routes from './routes';


const app = express();

// Apply middlewares
app.use(requestIdMiddleware);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms [ReqID: :req[id]]'));
app.use(helmet());
app.use(cors({
  origin: env.ALLOWED_ORIGINS ? env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['X-Request-ID']
}));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests, please try again later'
  }
});

app.use(apiLimiter);
app.use(express.json({ limit: '1mb' }));


app.use('/api', routes);

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    requestId: req.id,
    message: `Endpoint not found: ${req.originalUrl}`
  });
});

// Error handling middleware
app.use(errorHandler);

export default app;