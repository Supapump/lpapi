const express = require('express');
const app = express();
const lpRoutes = require('./routes/lp');
const { preloadPools } = require('./services/meteoraService');
const { preloadTokenList } = require('./services/tokenMetadata');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

app.use(express.json());
app.use('/lp', lpRoutes);

// Swagger setup
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Meteora LP API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Start server
(async () => {
  await preloadTokenList();
  await preloadPools();

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
