# Meteora LP API

A robust API for managing Meteora liquidity pools, providing endpoints for pool information, adding liquidity, and removing liquidity.

## Features

- Get all available liquidity pools
- Add liquidity to pools
- Remove liquidity from pools
- Input validation
- Error handling
- Standardized API responses
- CORS support
- Environment-based configuration

## Prerequisites

- Node.js >= 14.0.0
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/meteora-lp-api.git
cd meteora-lp-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
CORS_ORIGIN=*
NODE_ENV=development
```

## Project Structure

```
meteora-lp-api/
├── config/             # Configuration files
│   └── index.js        # Main configuration
├── middleware/         # Custom middleware
│   ├── errorHandler.js # Global error handling
│   └── responseFormatter.js # Response formatting
├── routes/            # API routes
│   └── lp.js          # Liquidity pool routes
├── services/          # Business logic
│   └── meteora.js     # Meteora service implementation
├── .env               # Environment variables
├── index.js           # Application entry point
├── package.json       # Project dependencies
└── README.md          # Project documentation
```

## API Endpoints

### Get All Pools
```http
GET /api/lp/pools
```

**Response:**
```json
{
    "success": true,
    "message": "Pools retrieved successfully",
    "data": [
        {
            "id": "SOL-USDC",
            "tokenA": "SOL",
            "tokenB": "USDC",
            "tvl": 100000,
            "apy": "12.5%"
        }
    ]
}
```

### Add Liquidity
```http
POST /api/lp/add
```

**Request Body:**
```json
{
    "wallet": "0x1234567890abcdef",
    "tokenA": "SOL",
    "tokenB": "USDC",
    "amountA": 10,
    "amountB": 1000
}
```

**Response:**
```json
{
    "success": true,
    "message": "Liquidity added successfully",
    "data": {
        "wallet": "0x1234567890abcdef",
        "added": "10 SOL + 1000 USDC",
        "txHash": "simulate_tx_123abc"
    }
}
```

### Remove Liquidity
```http
POST /api/lp/remove
```

**Request Body:**
```json
{
    "wallet": "0x1234567890abcdef",
    "lpToken": "SOL-USDC",
    "amount": 5
}
```

**Response:**
```json
{
    "success": true,
    "message": "Liquidity removed successfully",
    "data": {
        "wallet": "0x1234567890abcdef",
        "removed": "5 of SOL-USDC",
        "txHash": "simulate_tx_456def"
    }
}
```

## Error Handling

The API uses a standardized error response format:

```json
{
    "success": false,
    "error": {
        "message": "Error message here"
    }
}
```

Common error scenarios:
- Invalid input data
- Missing required fields
- Server errors

## Development

1. Start the development server:
```bash
npm run dev
```

2. Run tests:
```bash
npm test
```

3. Lint the code:
```bash
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 3000 |
| CORS_ORIGIN | CORS allowed origin | * |
| NODE_ENV | Environment (development/production) | development |

## API Testing

You can test the API using Postman or any HTTP client. See the [Postman Collection](#postman-collection) section for detailed examples.

### Postman Collection

1. Import the following collection:

```json
{
  "info": {
    "name": "Meteora LP API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Pools",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/lp/pools"
      }
    },
    {
      "name": "Add Liquidity",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/lp/add",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"wallet\": \"0x1234567890abcdef\",\n    \"tokenA\": \"SOL\",\n    \"tokenB\": \"USDC\",\n    \"amountA\": 10,\n    \"amountB\": 1000\n}"
        }
      }
    },
    {
      "name": "Remove Liquidity",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/lp/remove",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n    \"wallet\": \"0x1234567890abcdef\",\n    \"lpToken\": \"SOL-USDC\",\n    \"amount\": 5\n}"
        }
      }
    }
  ]
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express.js](https://expressjs.com/)
- [Express Validator](https://express-validator.github.io/docs/)
- [CORS](https://github.com/expressjs/cors)
