# lpapi
# Meteora LP API

A robust REST API for interacting with the Meteora Liquidity Pool system on Solana.

## Features

- Fetch LP pool information
- Get token pair data
- View total liquidity and pool volume
- Add/remove liquidity
- Swap tokens
- Check user positions
- Advanced analytics and statistics
- Token information and metrics
- Historical data and trends

## API Documentation

### Pool Operations

#### Get Pool Information
```
GET /api/v1/lp/pool/:poolId

Response:
{
    "poolId": "pool_123",
    "tokenA": {
        "address": "So11111111111111111111111111111111111111112",
        "symbol": "SOL",
        "reserve": "1000.45"
    },
    "tokenB": {
        "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "symbol": "USDC",
        "reserve": "20045.75"
    },
    "totalLiquidity": "50000",
    "apr": "12.5",
    "volume24h": "15000"
}
```

#### Get User Position
```
GET /api/v1/lp/position/:userAddress

Response:
{
    "userAddress": "5ZWj7a1f8tWkjBESHKgrNmk1kXUrcV1RhvzjNXXLFh7Q",
    "positions": [
        {
            "poolId": "pool_123",
            "share": "2.5",
            "tokenAAmount": "50.25",
            "tokenBAmount": "1005.50",
            "value": "2100.75"
        }
    ],
    "totalValue": "2100.75"
}
```

#### Add Liquidity
```
POST /api/v1/lp/add-liquidity

Request:
{
    "lpId": "pool_123",
    "tokenA": "So11111111111111111111111111111111111111112",
    "tokenB": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "amountA": "1.5",
    "amountB": "30",
    "slippageTolerance": "0.5",
    "userAddress": "5ZWj7a1f8tWkjBESHKgrNmk1kXUrcV1RhvzjNXXLFh7Q"
}

Response:
{
    "success": true,
    "transactionHash": "2ZmL8DpvmD3...",
    "poolId": "pool_123",
    "lpTokensMinted": "25.75",
    "timestamp": "2024-02-20T10:30:00Z"
}
```

#### Remove Liquidity
```
POST /api/v1/lp/remove-liquidity

Request:
{
    "poolId": "pool_123",
    "amount": "25.75",
    "userAddress": "5ZWj7a1f8tWkjBESHKgrNmk1kXUrcV1RhvzjNXXLFh7Q"
}

Response:
{
    "success": true,
    "transactionHash": "3YmL9DpvmD4...",
    "tokenAAmount": "1.48",
    "tokenBAmount": "29.75",
    "timestamp": "2024-02-20T10:35:00Z"
}
```

#### Swap Tokens
```
POST /api/v1/lp/swap

Request:
{
    "tokenIn": "So11111111111111111111111111111111111111112",
    "tokenOut": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "amountIn": "1.5",
    "userAddress": "5ZWj7a1f8tWkjBESHKgrNmk1kXUrcV1RhvzjNXXLFh7Q",
    "slippage": "1.0"
}

Response:
{
    "success": true,
    "transactionHash": "4XmL7DpvmD5...",
    "amountIn": "1.5",
    "amountOut": "29.85",
    "price": "19.9",
    "priceImpact": "0.2",
    "timestamp": "2024-02-20T10:40:00Z"
}
```

### Analytics Endpoints

#### Get Historical Volume
```
GET /api/v1/analytics/volume/history?startDate=2024-02-01T00:00:00Z&endDate=2024-02-20T23:59:59Z

Response:
{
    "timeframe": "daily",
    "data": [
        {
            "date": "2024-02-01",
            "volume": "125000",
            "trades": 450
        },
        {
            "date": "2024-02-02",
            "volume": "142000",
            "trades": 525
        }
    ],
    "totalVolume": "2670000",
    "totalTrades": 9875
}
```

#### Get Pool Volume
```
GET /api/v1/lp/volume/:poolId

Response:
{
    "poolId": "pool_123",
    "volume24h": "75000",
    "trades24h": 450,
    "volumeChange": "+5.2%",
    "tradesChange": "+3.1%"
}
```

#### Get Pool APR/APY
```
GET /api/v1/analytics/pool/pool_123/apr

Response:
{
    "poolId": "pool_123",
    "apr": "12.5",
    "apy": "13.2",
    "dailyFees": "225",
    "weeklyFees": "1575",
    "stakingRewards": "2.5"
}
```

#### Get Total Value Locked (TVL)
```
GET /api/v1/analytics/tvl

Response:
{
    "totalTvl": "15000000",
    "change24h": "+2.5%",
    "change7d": "+5.2%",
    "topPools": [
        {
            "id": "pool_123",
            "tvl": "1500000",
            "share": "10%"
        },
        {
            "id": "pool_456",
            "tvl": "1200000",
            "share": "8%"
        }
    ]
}
```

#### Get Pool Performance Metrics
```
GET /api/v1/analytics/pool/pool_123/metrics

Response:
{
    "poolId": "pool_123",
    "metrics": {
        "tvl": "1500000",
        "volume": {
            "24h": "75000",
            "7d": "525000",
            "30d": "2250000"
        },
        "fees": {
            "24h": "225",
            "7d": "1575",
            "30d": "6750"
        },
        "apr": {
            "current": "12.5",
            "7dAverage": "11.8",
            "30dAverage": "11.2"
        },
        "impermanentLoss": {
            "24h": "-0.2",
            "7d": "-0.8",
            "30d": "-1.5"
        }
    },
    "priceHistory": {
        "current": "20.1",
        "24hChange": "+2.5%",
        "7dChange": "+5.2%",
        "30dChange": "+12.8%"
    }
}
```

### Token Information

#### Get Token Information
```
GET /api/v1/tokens/:tokenAddress

Response:
{
    "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "symbol": "USDC",
    "name": "USD Coin",
    "decimals": 6,
    "totalSupply": "1000000000",
    "price": "1.00",
    "volume24h": "5000000",
    "marketCap": "1000000000"
}
```

#### Get Token Pools
```
GET /api/v1/tokens/:tokenAddress/pools

Response:
{
    "token": {
        "address": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        "symbol": "USDC",
        "name": "USD Coin"
    },
    "pools": [
        {
            "poolId": "pool_123",
            "pairedToken": {
                "address": "So11111111111111111111111111111111111111112",
                "symbol": "SOL"
            },
            "liquidity": "500000",
            "volume24h": "75000",
            "apr": "12.5"
        }
    ]
}
```

#### Get Token Price History
```
GET /api/v1/tokens/:tokenAddress/price-history

Response:
{
    "token": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "symbol": "USDC",
    "timeframe": "daily",
    "prices": [
        {
            "timestamp": "2024-02-01T00:00:00Z",
            "price": "1.001",
            "volume": "4500000"
        },
        {
            "timestamp": "2024-02-02T00:00:00Z",
            "price": "0.999",
            "volume": "4750000"
        }
    ]
}
```

#### Get Token Holders Statistics
```
GET /api/v1/tokens/:tokenAddress/holders

Response:
{
    "token": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    "totalHolders": 150000,
    "holdersChange24h": "+1.2%",
    "distribution": {
        "top10": "45%",
        "top50": "75%",
        "top100": "85%"
    },
    "topHolders": [
        {
            "address": "5ZWj7...",
            "balance": "10000000",
            "share": "1%"
        }
    ]
}
```

## Error Responses

All endpoints return consistent error responses in this format:
```json
{
    "error": "Error Type",
    "message": "Detailed error message"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request (validation errors)
- 401: Unauthorized
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Rate Limiting

- 100 requests per 15 minutes per IP address
- Rate limit headers included in responses:
  - `X-RateLimit-Limit`
  - `X-RateLimit-Remaining`
  - `X-RateLimit-Reset`

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

### Analytics and Statistics
- `GET /api/v1/analytics/volume/history` - Get historical volume data
- `GET /api/v1/analytics/pool/:poolId/apr` - Get pool APR/APY statistics
- `GET /api/v1/analytics/tvl` - Get total value locked (TVL)
- `GET /api/v1/analytics/pool/:poolId/metrics` - Get pool performance metrics

### Token Information
- `GET /api/v1/tokens/:tokenAddress` - Get token information
- `GET /api/v1/tokens/:tokenAddress/pools` - Get pools containing the token
- `GET /api/v1/tokens/:tokenAddress/price-history` - Get token price history
- `GET /api/v1/tokens/:tokenAddress/holders` - Get token holders statistics

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
