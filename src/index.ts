import app from './app';
import { env } from './config/env';

const port = parseInt(env.PORT, 10);

app.listen(port, () => {
  console.log(`Meteora LP API server running on port ${port}`);
  console.log(`Environment: ${env.NODE_ENV}`);
});