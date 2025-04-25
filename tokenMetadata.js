const { TokenListProvider } = require('@solana/token-registry');

let TOKEN_MAP = {};

const preloadTokenList = async () => {
  const provider = new TokenListProvider();
  const tokenListContainer = await provider.resolve();
  const tokenList = tokenListContainer.filterByChainId(101).getList();

  tokenList.forEach((token) => {
    TOKEN_MAP[token.address] = {
      name: token.name,
      symbol: token.symbol,
      logoURI: token.logoURI,
      decimals: token.decimals,
    };
  });
};

const getTokenMetadata = (mint) => TOKEN_MAP[mint] || {};

module.exports = { preloadTokenList, getTokenMetadata };
