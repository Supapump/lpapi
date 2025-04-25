const { Connection, PublicKey } = require('@solana/web3.js');
const METEORA_PROGRAM_ID = new PublicKey('ZVNTNRzy3U4pJD8zzYTiN4mpvTxHkW6Tg9kZ6y1hRas');
const RPC_URL = 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_URL);

const loadAllPools = async () => {
  try {
    const accounts = await connection.getProgramAccounts(METEORA_PROGRAM_ID, {
      filters: [{ dataSize: 352 }],
    });

    return accounts.map((acc) => {
      const data = acc.account.data;
      return {
        lpMint: new PublicKey(data.slice(168, 200)).toBase58(),
        tokenA: {
          mint: new PublicKey(data.slice(8, 40)).toBase58(),
          reserve: new PublicKey(data.slice(72, 104)).toBase58()
        },
        tokenB: {
          mint: new PublicKey(data.slice(40, 72)).toBase58(),
          reserve: new PublicKey(data.slice(104, 136)).toBase58()
        }
      };
    });
  } catch (err) {
    console.error('Failed to load pools:', err);
    return [];
  }
};

module.exports = { loadAllPools };
