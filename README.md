# Meteora LP API Backend

This Express.js backend simulates interactions with Meteora liquidity pools and user positions using mock data. It provides endpoints for health checks, querying pools, managing liquidity(adding and removing liquidity), check user positions, viewing all pools data and viewing statistics.

## Table of Contents

- [Installation](#installation)
- [Scripts](#scripts)
- [Mock Data](#mock-data)
- [API Reference](#api-reference)
  - [Health Check](#health-check)
  - [Pool Endpoints](#pool-endpoints)
  - [Position Endpoints](#position-endpoints)
  - [Stats Endpoints](#stats-endpoints)

## Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a .env file in your root dir and copy the .env.example to the .env file
  ```
  cp .env.example .env
  ```
 
## Scripts

| Command                | Description                                           |
|------------------------|-------------------------------------------------------|
| `npm run build`        | Compile TypeScript to JavaScript (output in `dist/`)  |
| `npm start`            | Run the compiled server from `dist/index.js`          |
| `npm run dev`          | Start the server in development mode with hot reload  |
| `npm test`             | Run unit and integration tests with Jest              |
| `npm run lint`         | Lint source files with ESLint                         |

## Mock Data

For testing purposes, mock data for pools and positions is provided in:
```
/data/mock-data.ts
```
Use these predefined pools and user positions to simulate API responses without an on-chain backend.

## API Reference

All routes are prefixed with `/api`. The main router mounts sub-routers as follows:
```ts
router.use('/health', healthRoutes);
router.use('/pools', poolRoutes);
router.use('/positions', positionRoutes);
router.use('/stats',  statsRoutes);
```

### Health Check

**GET** `/api/health`

- **Response (200)**
  ```json
  { "status": "ok" }
  ```

### Pool Endpoints

Mounted under `/api/pools` (alias `/api/pool` if needed).

| Method | Path                          | Description                        |
|--------|-------------------------------|------------------------------------|
| GET    | `/all`                        | List all pools                     |
| GET    | `/`                           | Search pools by `tokenAMint` & `tokenBMint` query params |
| GET    | `/:poolAddress`               | Get details of a specific pool     |
| POST   | `/add-liquidity`              | Add liquidity to a pool            |
| POST   | `/remove-liquidity`           | Remove liquidity from a pool       |

#### Example: Add Liquidity

- **POST** `/api/pools/add-liquidity`
- **Body (application/json)**
  ```json
  {
    "poolAddress": "<pool_address>",
    "tokenAAmount": "1.2345",
    "tokenBAmount": "50.00",
    "userAddress": "<user_wallet_address>"
  }
  ```
- **Response (200)**
  ```json
  {
    "success": true,
    "requestId": "…",
    "data": {
      "poolAddress": "…",
      "tokenAAmount": "…",
      "tokenBAmount": "…",
      "userAddress": "…",
      "transactionId": "tx_add_liq_…",
      "timestamp": "2025-04-27T…Z"
    }
  }
  ```

### Position Endpoints

Mounted under `/api/positions`.

| Method | Path                        | Description                            |
|--------|-----------------------------|----------------------------------------|
| GET    | `/:userAddress`             | Get all positions for a given user     |

#### Example: Get User Positions

- **GET** `/api/positions/5VZa58QdwEj1L8HdxKzEtDENN8n6KhJom3JRwzyB53w5`
- **Response (200)**
  ```json
  {
    "success": true,
    "requestId": "…",
    "data": [ /* array of Position objects */ ]
  }
  ```

### Stats Endpoints

Mounted under `/api/stats`.

| Method | Path                        | Description                            |
|--------|-----------------------------|----------------------------------------|
| GET    | `/overview`                 | Overview statistics for all pools      |
| GET    | `/pool/:poolAddress`        | Statistics for a specific pool         |

#### Example: Overview Stats

- **GET** `/api/stats/overview`
- **Response (200)**
  ```json
  {
    "success": true,
    "requestId": "…",
    "data": {
      "totalPools": <number>,
      "totalLiquidity": "…",
      "totalVolume24h": "…",
      "averageFee": <number>
    }
  }
  ```

