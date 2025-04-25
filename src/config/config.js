require('dotenv').config();

/**
 * Application configuration with sensible defaults
 */
const config = {
  // Server configuration
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Blockchain configuration
  RPC_URL: process.env.RPC_URL || 'https://mainnet.helius-rpc.com',
  HELIUS_API_KEY: process.env.HELIUS_API_KEY || '',
  NETWORK: process.env.NETWORK || 'mainnet',
  METEORA_PROGRAM_ID: process.env.METEORA_PROGRAM_ID || 'Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB',
  
  // Database configuration (PostgreSQL)
  DATABASE_URL: process.env.DATABASE_URL,
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '5432', 10),
  DB_NAME: process.env.DB_NAME || 'meteora',
  DB_USER: process.env.DB_USER || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || 'postgres',
  
  // Redis configuration
  REDIS_URL: process.env.REDIS_URL,
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT || '6379', 10),
  
  // Security configuration
  JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '90d',
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  API_KEY: process.env.API_KEY,
  
  // Cache configuration
  CACHE_TTL: parseInt(process.env.CACHE_TTL || '300', 10), // 5 minutes
  
  // Monitoring configuration  
  LOG_LEVEL: process.env.LOG_LEVEL || 'info'
};

// Validate critical configuration
const validateConfig = () => {
  const requiredFields = ['METEORA_PROGRAM_ID'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.error(`Missing required configuration: ${missingFields.join(', ')}`);
    process.exit(1);
  }
};

// Run validation in production
if (config.NODE_ENV === 'production') {
  validateConfig();
}

module.exports = config;
