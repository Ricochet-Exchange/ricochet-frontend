export const chainSettings = {
	chainId: parseInt(process.env.REACT_APP_CHAIN_ID || '137', 10),
	chanName: process.env.REACT_APP_CHAIN_NAME,
	nativeCurrency: {
		name: process.env.REACT_APP_CHAIN_NAME,
		symbol: process.env.REACT_APP_CHAIN_NAME,
		decimals: 18,
	},
	rpcUrls: [process.env.REACT_APP_RPC_URLS],
	blockExplorerUrls: [process.env.REACT_APP_BLOCK_URLS],
};
