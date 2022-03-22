export const chainSettings = { 
  chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '137', 10),
  chanName: process.env.NEXT_PUBLIC_CHAIN_NAME,
  nativeCurrency: {
    name: process.env.NEXT_PUBLIC_CHAIN_NAME, 
    symbol: process.env.NEXT_PUBLIC_CHAIN_NAME,
    decimals: 18, 
  },
  rpcUrls: [process.env.NEXT_PUBLIC_RPC_URLS],
  blockExplorerUrls: [process.env.NEXT_PUBLIC_BLOCK_URLS],
};
