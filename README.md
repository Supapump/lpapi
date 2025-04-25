# Meteora LP API Endpoint

A production-grade RESTful API for interacting with Meteora Liquidity Pools on Solana blockchain, developed using Node.js and Express.

## Live Demo

A live demonstration of this API is available at:
- **API URL**: [http://16.170.227.240](http://16.170.227.240)
- **API Documentation**: [http://16.170.227.240/api-docs](http://16.170.227.240/api-docs)

The live demo is deployed on AWS EC2 using:
- Node.js runtime
- PM2 for process management and auto-restart
- Nginx as a reverse proxy
- Full environment configuration

## Features

- RESTful API for interacting with Meteora Liquidity Pools on Solana
- View all pools and specific pool details
- Get user LP positions 
- Add/remove liquidity from pools
- Authentication using JWT and wallet signature verification
- Rate limiting to prevent API abuse
- Caching to reduce RPC calls to the blockchain
- Comprehensive error handling and logging
- API documentation with Swagger UI
- Graceful degradation with fallbacks for external dependencies

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **@solana/web3.js** - Solana JavaScript API for blockchain interaction
- **@project-serum/anchor** - Framework for Solana smart contract interaction
- **@solana/spl-token** - Solana Program Library token utilities
- **Winston** - Logging library
- **Swagger-UI** - API documentation
- **JWT** - Authentication
- **Redis** - Rate limiting and caching (with in-memory fallback)
- **PostgreSQL** - Data persistence (optional)
- **Helmet** - Security middleware

## Project Structure

```
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── middlewares/   # Express middleware
│   ├── models/        # Data models
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── logs/              # Application logs
├── .env               # Environment variables
├── .env.example       # Example environment variables
└── package.json       # Project dependencies
```

## API Endpoints

### Public Endpoints

- `GET /` - Welcome message and API info
- `GET /api-docs` - Interactive API documentation
- `GET /api/v1/pools` - Get all liquidity pools
- `GET /api/v1/pools/:poolId` - Get specific pool details
- `GET /api/v1/positions/:address` - Get user LP positions

### Protected Endpoints (require authentication)

- `POST /api/v1/liquidity/add` - Add liquidity to a pool
- `POST /api/v1/liquidity/remove` - Remove liquidity from a pool

## Getting Started

### Prerequisites

- Node.js v14 or higher
- npm v6 or higher
- (Optional) Redis for production-grade rate limiting and caching
- (Optional) PostgreSQL for persistent data storage

### Installation

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file based on `.env.example`

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration values

### Environment Variables

```
# Server configuration
PORT=3000
NODE_ENV=development

# Blockchain configuration
RPC_URL=https://mainnet.helius-rpc.com
HELIUS_API_KEY=your_helius_api_key
NETWORK=mainnet
METEORA_PROGRAM_ID=Eo7WjKq67rjJQSZxS6z3YkapzY3eMj6Xy8X5EQVn5UaB

# Security configuration
JWT_SECRET=your_jwt_secret_for_token_generation
API_KEY=your_api_key_for_testing

# Cache configuration
CACHE_TTL=300

# Redis configuration (optional)
REDIS_URL=redis://localhost:6379

# Database configuration (optional)
DATABASE_URL=postgres://user:password@localhost:5432/meteora

# Logging
LOG_LEVEL=info
```

### Running the API

**Development mode:**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

## API Documentation

The API documentation is available at `/api-docs` when the server is running. It provides a detailed overview of all endpoints, request/response formats, and allows for testing the API directly from the browser.

## Implementation Details

### Solana Blockchain Integration

The API interacts with Meteora's Liquidity Pools on the Solana blockchain using:
- `@solana/web3.js` for basic blockchain interactions
- `@project-serum/anchor` for program interaction
- `@solana/spl-token` for token operations

### Caching Strategy

To minimize RPC calls to the blockchain, the API implements a two-level caching strategy:
1. In-memory cache for development environments
2. Redis cache for production environments (with fallback to in-memory)

### Authentication

The API supports multiple authentication methods:
1. JWT tokens for standard API access
2. Solana wallet signature verification for blockchain operations
3. API key for testing and integration

### Error Handling

The API implements comprehensive error handling with:
1. Custom error classes for consistent responses
2. Detailed logging with different severity levels
3. Sanitized error messages for client responses

## Security Considerations

This API implements several security best practices:
- JWT authentication for protected endpoints
- Rate limiting to prevent abuse
- Input validation for all requests
- Helmet for setting secure HTTP headers
- Environment variable configuration for sensitive data
- Error handling that doesn't leak sensitive information

## Author

- **Said Benzaid** - [X/Twitter](https://x.com/Benzaid_Said_)

## License

ISC
