/**
 * Cache manager to reduce RPC calls to the blockchain
 * In production, this would be backed by Redis
 */
class CacheManager {
  constructor() {
    this.cache = {};
    this.redisClient = null;
    this.useRedis = false;
    
    // Try to initialize Redis if available
    this._initRedis();
  }
  
  async _initRedis() {
    try {
      const config = require('../config/config');
      
      if (config.REDIS_URL || (config.REDIS_HOST && config.REDIS_PORT)) {
        const redis = require('redis');
        this.redisClient = redis.createClient({
          url: config.REDIS_URL || `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
        });
        
        await this.redisClient.connect();
        this.useRedis = true;
        console.log('Redis connected successfully for caching');
      }
    } catch (error) {
      console.warn('Redis not available, using in-memory cache:', error.message);
      this.redisClient = null;
      this.useRedis = false;
    }
  }
  
  /**
   * Get a value from cache
   * @param {string} key - Cache key
   * @returns {Promise<*>} Cached value or null
   */
  async get(key) {
    try {
      const prefixedKey = `meteora:${key}`;
      
      if (this.useRedis && this.redisClient) {
        const value = await this.redisClient.get(prefixedKey);
        return value ? JSON.parse(value) : null;
      }
      
      // Fallback to in-memory cache
      const item = this.cache[prefixedKey];
      if (!item) return null;
      
      // Check if expired
      if (item.expiry < Date.now()) {
        delete this.cache[prefixedKey];
        return null;
      }
      
      return item.value;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  
  /**
   * Set a value in cache
   * @param {string} key - Cache key
   * @param {*} value - Value to cache
   * @param {number} ttl - Time to live in seconds
   * @returns {Promise<boolean>} Success status
   */
  async set(key, value, ttl = 300) {
    try {
      const prefixedKey = `meteora:${key}`;
      
      if (this.useRedis && this.redisClient) {
        await this.redisClient.set(prefixedKey, JSON.stringify(value), {
          EX: ttl
        });
        return true;
      }
      
      // Fallback to in-memory cache
      this.cache[prefixedKey] = {
        value,
        expiry: Date.now() + (ttl * 1000)
      };
      
      return true;
    } catch (error) {
      console.error('Cache set error:', error);
      return false;
    }
  }
  
  /**
   * Delete a value from cache
   * @param {string} key - Cache key
   * @returns {Promise<boolean>} Success status
   */
  async del(key) {
    try {
      const prefixedKey = `meteora:${key}`;
      
      if (this.useRedis && this.redisClient) {
        await this.redisClient.del(prefixedKey);
        return true;
      }
      
      // Fallback to in-memory cache
      delete this.cache[prefixedKey];
      return true;
    } catch (error) {
      console.error('Cache delete error:', error);
      return false;
    }
  }
}

module.exports = new CacheManager();
