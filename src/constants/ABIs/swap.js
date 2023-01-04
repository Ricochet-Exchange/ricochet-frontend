export const SwapABI = [
	{
		inputs: [
			{ internalType: 'contract ISwapRouter02', name: '_swapRouter', type: 'address' },
			{ internalType: 'address', name: '_superNativeToken', type: 'address' },
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'string', name: 'reason', type: 'string' }],
		name: 'ErrorOnSwap',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'bytes', name: 'returnData', type: 'bytes' }],
		name: 'ReturnDataEvent',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [{ indexed: false, internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
		name: 'SuperSwapComplete',
		type: 'event',
	},
	{
		inputs: [],
		name: 'superNativeToken',
		outputs: [{ internalType: 'address', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{ internalType: 'contract ISuperToken', name: '_from', type: 'address' },
			{ internalType: 'contract ISuperToken', name: '_to', type: 'address' },
			{ internalType: 'uint256', name: 'amountIn', type: 'uint256' },
			{ internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
			{ internalType: 'address[]', name: 'path', type: 'address[]' },
			{ internalType: 'uint24[]', name: 'poolFees', type: 'uint24[]' },
			{ internalType: 'bool', name: '_hasUnderlyingFrom', type: 'bool' },
			{ internalType: 'bool', name: '_hasUnderlyingTo', type: 'bool' },
		],
		name: 'swap',
		outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'swapRouter',
		outputs: [{ internalType: 'contract ISwapRouter02', name: '', type: 'address' }],
		stateMutability: 'view',
		type: 'function',
	},
];
