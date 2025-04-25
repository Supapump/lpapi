const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const rateLimit = require('express-rate-limit');
const config = require('./config/config');
const logger = require('./utils/logger');
const poolRoutes = require('./routes/pool.routes');
const ApiError = require('./utils/ApiError');

// Initialize Express app
const app = express();

// Apply security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' })); // Limit size of JSON payloads
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Add logging middleware
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: {
      write: (message) => logger.info(message.trim())
    }
  }));
}

// Define Swagger options
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meteora LP API',
      version: '1.0.0',
      description: 'API for interacting with Meteora Liquidity Pools on the Solana blockchain',
      contact: {
        name: 'API Support',
        email: 'support@example.com',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}/api/v1`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Pool: {
          type: 'object',
          properties: {
            poolId: {
              type: 'string',
              example: 'EoWjkq67rJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB',
            },
            lpTokenMint: {
              type: 'string',
              example: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
            },
            tokenA: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  example: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
                },
                symbol: {
                  type: 'string',
                  example: 'USDC',
                },
                decimals: {
                  type: 'integer',
                  example: 6,
                },
                reserve: {
                  type: 'string',
                  example: '1000000000',
                },
              },
            },
            tokenB: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  example: 'So11111111111111111111111111111111111111112',
                },
                symbol: {
                  type: 'string',
                  example: 'SOL',
                },
                decimals: {
                  type: 'integer',
                  example: 9,
                },
                reserve: {
                  type: 'string',
                  example: '500000000000',
                },
              },
            },
            totalSupply: {
              type: 'string',
              example: '1000000',
            },
            swapFee: {
              type: 'number',
              example: 0.003,
            },
            tvl: {
              type: 'string',
              example: '10000000',
            },
            apr: {
              type: 'string',
              example: '12.5',
            },
            lastUpdated: {
              type: 'integer',
              example: 1649870400000,
            },
          },
        },
        Position: {
          type: 'object',
          properties: {
            poolId: {
              type: 'string',
              example: 'EoWjkq67rJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB',
            },
            tokenA: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  example: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
                },
                symbol: {
                  type: 'string',
                  example: 'USDC',
                },
                decimals: {
                  type: 'integer',
                  example: 6,
                },
                reserve: {
                  type: 'string',
                  example: '1000000000',
                },
              },
            },
            tokenB: {
              type: 'object',
              properties: {
                address: {
                  type: 'string',
                  example: 'So11111111111111111111111111111111111111112',
                },
                symbol: {
                  type: 'string',
                  example: 'SOL',
                },
                decimals: {
                  type: 'integer',
                  example: 9,
                },
                reserve: {
                  type: 'string',
                  example: '500000000000',
                },
              },
            },
            lpTokenBalance: {
              type: 'string',
              example: '100000',
            },
            poolShare: {
              type: 'string',
              example: '0.5',
            },
            valueA: {
              type: 'string',
              example: '500000',
            },
            valueB: {
              type: 'string',
              example: '250000000',
            },
            addedAt: {
              type: 'integer',
              example: 1649870400,
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// API routes
app.use('/api/v1', poolRoutes);

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to Meteora LP API',
    documentation: '/api-docs'
  });
});

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handler
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  // Log error
  if (err.statusCode === 500) {
    logger.error('Server error:', err);
  } else {
    logger.warn('Client error:', { path: req.path, error: err.message, statusCode: err.statusCode });
  }
  
  // Send error response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: config.NODE_ENV === 'development' ? err.stack : undefined,
    error: config.NODE_ENV === 'development' ? err : undefined
  });
});

module.exports = app;
