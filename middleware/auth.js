// Simple API key authentication middleware
const apiKeyAuth = (req, res, next) => {
  // If API_KEY is not set in environment, skip authentication
  if (!process.env.API_KEY) {
    return next();
  }
  
  const apiKey = req.headers['x-api-key'];
  const validApiKey = process.env.API_KEY;
  
  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized: Invalid or missing API key' 
    });
  }
  
  next();
};

module.exports = { apiKeyAuth };
