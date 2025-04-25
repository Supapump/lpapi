# Meteora Liquidity Pool API

## Overview

The **Meteora Liquidity Pool API** is a secure and efficient Node.js-based REST API that enables users and applications to interact with the Meteora liquidity pools programmatically. It supports operations such as fetching liquidity pool data, adding and removing liquidity, and retrieving detailed pool information. This API is designed to integrate easily into decentralized finance (DeFi) platforms and other applications requiring access to liquidity pool data.

## Features

- **Fetch All Liquidity Pools**: Retrieve a list of all available liquidity pools.
- **Search Pools by Tokens**: Find liquidity pools based on the specific tokens involved.
- **Get Pool Information**: Get detailed information about a specific pool using its address.
- **Add Liquidity**: Securely add liquidity to a pool (requires authentication).
- **Remove Liquidity**: Securely remove liquidity from a pool (requires authentication).

## Endpoints

### 1. **GET /api/lp/all**
   - **Description**: Fetch a list of all liquidity pools.
   - **Response**:
     ```json
     [
       {
         "poolAddress": "0x1234567890abcdef",
         "tokenA": "Token A",
         "tokenB": "Token B",
         "liquidity": 1000
       },
       ...
     ]
     ```

### 2. **GET /api/lp/by-tokens**
   - **Description**: Fetch liquidity pools based on the provided tokens.
   - **Query Parameters**:
     - `tokenA`: Address of Token A.
     - `tokenB`: Address of Token B.
   - **Example**:
     ```
     /api/lp/by-tokens?tokenA=0xabc123&tokenB=0xdef456
     ```
   - **Response**:
     ```json
     [
       {
         "poolAddress": "0x1234567890abcdef",
         "liquidity": 5000
       }
     ]
     ```

### 3. **GET /api/lp/info/:poolAddress**
   - **Description**: Fetch detailed information about a specific liquidity pool by its address.
   - **Parameters**:
     - `poolAddress`: The address of the liquidity pool.
   - **Example**:
     ```
     /api/lp/info/0x1234567890abcdef
     ```
   - **Response**:
     ```json
     {
       "poolAddress": "0x1234567890abcdef",
       "tokenA": "Token A",
       "tokenB": "Token B",
       "liquidity": 1000,
       "transactions": 120
     }
     ```

### 4. **POST /api/lp/add-liquidity**
   - **Description**: Add liquidity to a specific pool. **Requires authentication**.
   - **Request Body**:
     ```json
     {
       "tokenA": "0xabc123",
       "tokenB": "0xdef456",
       "amountA": 1000,
       "amountB": 1000
     }
     ```
   - **Response**:
     ```json
     {
       "status": "success",
       "message": "Liquidity added successfully"
     }
     ```

### 5. **POST /api/lp/remove-liquidity**
   - **Description**: Remove liquidity from a specific pool. **Requires authentication**.
   - **Request Body**:
     ```json
     {
       "tokenA": "0xabc123",
       "tokenB": "0xdef456",
       "amountA": 500,
       "amountB": 500
     }
     ```
   - **Response**:
     ```json
     {
       "status": "success",
       "message": "Liquidity removed successfully"
     }
     ```

## Authentication

The **Add Liquidity** and **Remove Liquidity** endpoints require authentication. You can authenticate using a **Bearer token**. Here's how to include it in your requests:

- Add an `Authorization` header:
  - Key: `Authorization`
  - Value: `Bearer YOUR_TOKEN_HERE`

## Setup and Deployment

### Prerequisites

To run the project locally, you'll need:
- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **Postman** (or another API testing tool) for testing the endpoints

### Installing Dependencies

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/lpapi.git
2. Navigate to the project folder:
    ```bash
    cd lpapi
3. Install the required dependencies:
    ```bash
   npm install


