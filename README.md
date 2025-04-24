# Meteora LP API

A REST API for interacting with Meteora Liquidity Pools on Solana blockchain.

## Features

- Solana blockchain integration using @solana/web3.js
- Get information about all liquidity pools
- Get details about a specific pool
- View user's liquidity positions
- Add liquidity to pools
- Remove liquidity from pools
- Optional API key authentication for security

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables in `.env` file:
   ```
   PORT=3000
   METEORA_API_URL=https://api.meteora.example.com
   SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
   METEORA_PROGRAM_ID=<YOUR_METEORA_PROGRAM_ID>
   METEORA_FACTORY_ADDRESS=<YOUR_METEORA_FACTORY_ADDRESS>
   # Optional API authentication
   # API_KEY=<YOUR_SECRET_API_KEY>
   ```
4. Start the server:
   ```
   npm start
   ```

## API Endpoints

API key authentication is optional. If you set an API_KEY in your .env file, all endpoints (except /health) will require this key to be provided in the `x-api-key` header.

### Health Check
```
GET /health
```

### Get All Pools
```
GET /api/meteora/pools
```

### Get Pool by ID
```
GET /api/meteora/pools/:id
```

### Get User Positions
```
GET /api/meteora/positions/:address
```

### Add Liquidity
```
POST /api/meteora/liquidity/add
```
Request body:
```json
{
  "poolId": "7o36UsWR1JQLpZ9PE2gn9L4SQ69CNNiWAXd4Jt7rqz9Z",
  "tokenAmounts": ["1.0", "1000"],
  "slippage": "0.5",
  "userAddress": "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
}
```

### Remove Liquidity
```
POST /api/meteora/liquidity/remove
```
Request body:
```json
{
  "poolId": "7o36UsWR1JQLpZ9PE2gn9L4SQ69CNNiWAXd4Jt7rqz9Z",
  "lpAmount": "5.0",
  "minAmountsOut": ["0.5", "500"],
  "userAddress": "5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8"
}
```

## Solana Integration Details

This API integrates with the Solana blockchain to:

1. Fetch real pool data from on-chain Meteora contracts
2. Query user token accounts to determine liquidity positions
3. Prepare transactions for adding and removing liquidity

In a production environment, transaction signing would typically happen client-side, with this API preparing the transactions and verifying their execution.

## Security Features

- Optional API key authentication
- Input validation for all requests
- Proper error handling with appropriate HTTP status codes

## Notes

For a production environment, additional improvements would include:

1. More robust error handling
2. Rate limiting
3. Comprehensive logging
4. Transaction monitoring
5. Caching for frequently accessed blockchain data
