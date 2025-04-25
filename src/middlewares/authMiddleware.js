const jwt = require('jsonwebtoken');
const { PublicKey } = require('@solana/web3.js');
const nacl = require('tweetnacl');
const logger = require('../utils/logger');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');

/**
 * Authentication middleware
 * Validates JWT tokens or API keys
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Check for API key first (easier for testing and integrations)
    const apiKey = req.headers['x-api-key'];
    if (apiKey && config.API_KEY && apiKey === config.API_KEY) {
      return next();
    }
    
    // Check for JWT token in Authorization header
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      // For blockchain wallet authentication, check for wallet signature
      const signature = req.headers['x-wallet-signature'];
      const message = req.headers['x-wallet-message'];
      const walletAddress = req.headers['x-wallet-address'];
      
      if (signature && message && walletAddress) {
        return validateWalletSignature(signature, message, walletAddress, req, next);
      }
      
      return next(new ApiError('You are not logged in. Please provide authentication credentials', 401));
    }
    
    // Verify JWT token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Add user info to request object for downstream middleware/controllers
    req.user = decoded;
    
    return next();
  } catch (error) {
    logger.error('Authentication error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return next(new ApiError('Invalid token', 401));
    }
    
    if (error.name === 'TokenExpiredError') {
      return next(new ApiError('Token expired', 401));
    }
    
    return next(new ApiError('Authentication failed', 401));
  }
};

/**
 * Validate Solana wallet signature
 * @param {string} signature - Base64 encoded signature
 * @param {string} message - Message that was signed
 * @param {string} walletAddress - Wallet address that signed the message
 * @param {Object} req - Express request object
 * @param {Function} next - Express next middleware function
 */
const validateWalletSignature = (signature, message, walletAddress, req, next) => {
  try {
    // Decode the signature
    const signatureBytes = Buffer.from(signature, 'base64');
    
    // Get the public key from the wallet address
    const publicKeyBytes = new PublicKey(walletAddress).toBuffer();
    
    // Convert message to bytes
    const messageBytes = Buffer.from(message, 'utf8');
    
    // Verify the signature
    const verified = nacl.sign.detached.verify(
      messageBytes,
      signatureBytes,
      publicKeyBytes
    );
    
    if (!verified) {
      return next(new ApiError('Invalid wallet signature', 401));
    }
    
    // Add wallet info to request object
    req.wallet = {
      address: walletAddress,
      message
    };
    
    // If message contains a timestamp, verify it's recent
    if (message.includes('timestamp')) {
      try {
        const messageObj = JSON.parse(message);
        const timestamp = messageObj.timestamp;
        const now = Math.floor(Date.now() / 1000);
        
        // Check if timestamp is within 5 minutes
        if (now - timestamp > 300) {
          return next(new ApiError('Signature expired', 401));
        }
      } catch (e) {
        logger.warn('Failed to parse message timestamp:', e);
      }
    }
    
    return next();
  } catch (error) {
    logger.error('Wallet authentication error:', error);
    return next(new ApiError('Wallet authentication failed', 401));
  }
};

module.exports = authMiddleware;
