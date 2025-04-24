# lpapi
# Meteora LP API

A REST API for interacting with the Meteora Liquidity Pool system on Solana.

## Features

- Fetch LP pool information
- Get token pair data
- View total liquidity and pool volume
- Add/remove liquidity
- Swap tokens
- Check user positions

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```bash
   # Server Configuration
   PORT=3000                    
   NODE_ENV=development         

   # Solana Configuration
   SOLANA_RPC_URL=your_rpc_url  

   # Meteora LP Configuration
   METEORA_LP_PROGRAM_ID=       
   METEORA_ADMIN_KEY=           #optional
   
   # Security Configuration
   RATE_LIMIT_WINDOW_MS=900000  #Rate limit 15 minutes
   RATE_LIMIT_MAX=100          #mXax requests per window
   ```

4. Start the server:
   ```bash
   npm run dev    # Development mode with hot-reload
   npm start      # Production mode
   ```

## API Endpoints

### Pool Information
- `GET /api/v1/lp/pool/:poolId` - Get pool information
- `GET /api/v1/lp/volume/:poolId` - Get pool volume

### Liquidity Management
- `POST /api/v1/lp/add-liquidity` - Add liquidity to a pool
- `POST /api/v1/lp/remove-liquidity` - Remove liquidity from a pool

### User Operations
- `GET /api/v1/lp/position/:userAddress` - Get user's liquidity position
- `POST /api/v1/lp/swap` - Swap tokens

## Request/Response Examples

### Add Liquidity
```json
POST /api/v1/lp/add-liquidity
{
  "tokenA": "TOKEN_A_ADDRESS",
  "tokenB": "TOKEN_B_ADDRESS",
  "amountA": "100",
  "amountB": "100",
  "userAddress": "USER_WALLET_ADDRESS"
}
```

### Get Pool Information
```json
GET /api/v1/lp/pool/POOL_ID
Response:
{
  "tokenA": "TOKEN_A_ADDRESS",
  "tokenB": "TOKEN_B_ADDRESS",
  "totalLiquidity": "1000000",
  "tokenARatio": "1",
  "tokenBRatio": "1"
}
```

## Security

- Rate limiting enabled (configurable via environment variables)
- Input validation on all endpoints
- CORS and Helmet security middleware
- Environment variable configuration
- Request sanitization

## Environment Variables

### Required Variables
- `PORT`: Server port number
- `SOLANA_RPC_URL`: Solana RPC endpoint URL

### Optional Variables
- `NODE_ENV`: Application environment (defaults to 'development')
- `METEORA_LP_PROGRAM_ID`: Meteora LP program ID
- `METEORA_ADMIN_KEY`: Admin wallet private key
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window (defaults to 15 minutes)
- `RATE_LIMIT_MAX`: Maximum requests per window (defaults to 100)

### Environment Setup Tips
1. For development:
   - Use Solana devnet: `https://api.devnet.solana.com`
   - Enable debug logging
   - Set lower rate limits for testing

2. For production:
   - Use secure RPC endpoints
   - Set appropriate rate limits
   - Enable all security middleware
   - Use SSL/TLS
   - Monitor API usage

## Development

To run tests:
```bash
npm test
```

## License

MIT
