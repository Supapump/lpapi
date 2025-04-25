# Meteora LP API

A Node.js REST API to fetch live LP data from the Meteora protocol on Solana. Supports token balances, LP supply, token metadata, and listing all LP pools.

## Endpoints

- GET `/lp` - List all LP pools
- GET `/lp/:poolId` - Get detailed info about a pool
- GET `/docs` - Swagger documentation

## Setup

```bash
npm install
npm start
```
