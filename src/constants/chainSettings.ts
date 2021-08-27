export const chainSettings = { 
  chainId: process.env.REACT_APP_CHAIN_ID,
  chanName: process.env.REACT_APP_CHAIN_NAME,
  nativeCurrency: {
    name: process.env.REACT_APP_CHAIN_NAME, 
    symbol: process.env.REACT_APP_CHAIN_NAME,
    decimals: 18, 
  },
  rpcUrls: [process.env.REACT_APP_RPC_URLS],
  blockExplorerUrls: [process.env.REACT_APP_BLOCK_URLS],
};
