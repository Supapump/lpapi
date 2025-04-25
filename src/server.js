const app = require('./app');
const config = require('./config/config');
const logger = require('./utils/logger');

// Process error handling
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! Shutting down...', err);
  process.exit(1);
});

// Start the server
const server = app.listen(config.PORT, () => {
  logger.info(`Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
  logger.info(`API documentation available at http://localhost:${config.PORT}/api-docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! Shutting down...', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM signal (for graceful shutdown)
process.on('SIGTERM', () => {
  logger.info('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated!');
  });
});
