/**
 * Meteora LP Contract ABI
 * This ABI is used to interact with the Meteora Liquidity Pool contracts
 */
module.exports = [
  // Pool Information
  {
    "inputs": [],
    "name": "getPoolCount",
    "outputs": [{"type": "uint256", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": ""}],
    "name": "allPools",
    "outputs": [{"type": "address", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTokens",
    "outputs": [
      {"type": "address", "name": "tokenA"},
      {"type": "address", "name": "tokenB"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getReserves",
    "outputs": [
      {"type": "uint256", "name": "reserveA"},
      {"type": "uint256", "name": "reserveB"},
      {"type": "uint32", "name": "blockTimestampLast"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"type": "uint256", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "swapFee",
    "outputs": [{"type": "uint256", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "address", "name": "owner"}],
    "name": "balanceOf",
    "outputs": [{"type": "uint256", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  
  // Token Management
  {
    "inputs": [],
    "name": "getSupportedTokenCount",
    "outputs": [{"type": "uint256", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"type": "uint256", "name": ""}],
    "name": "supportedTokens",
    "outputs": [{"type": "address", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  
  // Liquidity Functions
  {
    "inputs": [
      {"type": "address", "name": "tokenA"},
      {"type": "address", "name": "tokenB"},
      {"type": "uint256", "name": "amountADesired"},
      {"type": "uint256", "name": "amountBDesired"},
      {"type": "uint256", "name": "amountAMin"},
      {"type": "uint256", "name": "amountBMin"},
      {"type": "uint256", "name": "deadline"}
    ],
    "name": "addLiquidity",
    "outputs": [
      {"type": "uint256", "name": "amountA"},
      {"type": "uint256", "name": "amountB"},
      {"type": "uint256", "name": "liquidity"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"type": "uint256", "name": "liquidity"},
      {"type": "uint256", "name": "amountAMin"},
      {"type": "uint256", "name": "amountBMin"},
      {"type": "uint256", "name": "deadline"}
    ],
    "name": "removeLiquidity",
    "outputs": [
      {"type": "uint256", "name": "amountA"},
      {"type": "uint256", "name": "amountB"}
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  
  // Rewards
  {
    "inputs": [{"type": "address", "name": "user"}],
    "name": "pendingReward",
    "outputs": [{"type": "uint256", "name": ""}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
