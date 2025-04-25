const express = require('express');
const cors = require('cors');
const config = require('./config');
const lpRoutes = require('./routes/lp');
const errorHandler = require('./middleware/errorHandler');
const responseFormatter = require('./middleware/responseFormatter');

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());
app.use(responseFormatter);

// Routes
app.use(config.api.prefix, lpRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`✅ Meteora LP API running on port ${config.port}`);
});
