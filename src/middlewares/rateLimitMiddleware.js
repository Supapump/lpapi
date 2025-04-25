const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const config = require('../config/config');
const logger = require('../utils/logger');

// Try to create Redis client if configured
let redisClient;
try {
  if (config.REDIS_URL || (config.REDIS_HOST && config.REDIS_PORT)) {
    redisClient = redis.createClient({
      url: config.REDIS_URL || `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
    });
    
    // Connect the Redis client
    redisClient.connect().then(() => {
      logger.info('Redis connected for rate limiting');
    }).catch(err => {
      logger.warn('Redis connection failed:', err.message);
      redisClient = null;
    });
  }
} catch (error) {
  logger.warn('Redis not available for rate limiting:', error.message);
  redisClient = null;
}

/**
 * Create rate limiter with appropriate storage
 */
const createLimiter = () => {
  const limiterOptions = {
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    max: config.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      status: 'error',
      message: 'Too many requests, please try again later',
    },
    keyGenerator: (req) => {
      // Use API key or IP address as rate limit key
      if (req.headers['x-api-key']) {
        return `api-key:${req.headers['x-api-key']}`;
      }
      return req.ip;
    }
  };
  
  // Use Redis store if available
  if (redisClient) {
    try {
      limiterOptions.store = new RedisStore({
        sendCommand: (...args) => redisClient.sendCommand(args),
        prefix: 'ratelimit:',
      });
      logger.info('Using Redis store for rate limiting');
    } catch (error) {
      logger.warn('Failed to create Redis store for rate limiting:', error.message);
    }
  }
  
  return rateLimit(limiterOptions);
};

/**
 * Rate limiting middleware
 */
const rateLimitMiddleware = createLimiter();

module.exports = rateLimitMiddleware;
