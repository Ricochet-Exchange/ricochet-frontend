// Config addresses //

export const chainId = 137;
export const hostAddress = '0x3E14dC1b13c488a8d5D310918780c983bD5982E7';
export const idaAddress = '0xB0aABBA4B2783A72C52956CDEF62d438ecA2d7a1';
export const ZeroAddress = '0x0000000000000000000000000000000000000000';
export const rexReferralAddress = '0xA0eC9E1542485700110688b3e6FbebBDf23cd901';

// Water Drops //

export const rexShirtWaterdrop = '0x4965DD6Cc99e20B33B744374F132f7b5F8333a06';
export const alluoWaterdrop = '0x114e5EAbd33B34F3B7f481Df4fc2617dE6cd2B66';

// Currently in use contracts //

export const twoWayWETHMarketAddress = '0xF1748222B08193273fd34FF10A28352A2C25Adb0'; 
export const twoWayMarketWBTCAddress = '0x11Bfe0ff11819274F0FD57EFB4fc365800792D54';
export const twoWayMarketDAIWETHAddress = '0xB44B371A56cE0245ee961BB8b4a22568e3D32874';
export const twoWayMarketRICUSDCAddress = '0x86c2B55bf5d3E9DAC2747389B38D41C6B1F34179';
export const twoWayMarketMATICUSDCAddress = '0xF989C73d04D20c84d6A4D26d07090D0a63F021C7';
export const twoWayMarketMATICDAIAddress = '0x9FC28B1887589785CA43C57946dD0d3eD781A1eE';
export const twoWayMarketWBTCDAIAddress = '0xaA6BF289A0b3BB71dd7DfABE7A373410d37A4b70';
export const twoWayMarketibAlluoUSDETHAddress = '0x56aCA122d439365B455cECb14B4A39A9d1B54621'; 
export const twoWayMarketibAlluoUSDBTCAddress = '0xbB5C64B929b1E60c085dcDf88dfe41c6b9dcf65B'; 

// Ricochet Exchange Tokens //

export const RexHatAddress = '0xe91D640fCAEA9602CF94C0d48A251a7f6d946953';
export const RICAddress = '0x263026E7e53DBFDce5ae55Ade22493f828922965';
export const RexShirtAddress = '0x19cA69C66768B487D28226C0a60Ab2B2aa8E5c5C';
export const ricRexShirtLaunchpadAddress = '0x284cdaDc181691cd1de3530BC1b60F90Ba640f4D';
export const ricRexHatLaunchpadAddress = '0xFc2ac85264e438ECd4d7Df3fC2449bfef6D307b6';
export const rickosheaAppAddress = '0x387af38C133056a0744FB6e823CdB459AE3c5a1f';
export const rexLPETHAddress = '0x9d5753d8eb0Bc849C695461F866a851F13947CB3';

// Base Token ERC20 AND ERC777 Pairs //
export const WMATICAddress = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'; // There is no address token for matic, not useful
export const MATICxAddress = '0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3'; // This is maticx indeed, and not wmaticx

export const DAIAddress = '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063';
export const DAIxAddress = '0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2';

export const USDCxAddress = '0xCAa7349CEA390F89641fe306D93591f87595dc1F';
export const USDCAddress = '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174';

export const WETHxAddress = '0x27e1e4E6BC79D93032abef01025811B7E4727e85';
export const WETHAddress = '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619';

export const WBTCxAddress = '0x4086eBf75233e8492F1BCDa41C7f2A8288c2fB92';
export const WBTCAddress = '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6';

// - ALLUO Contracts
export const StIbAlluoUSDAddress = '0xE9E759B969B991F2bFae84308385405B9Ab01541';
export const IbAlluoUSDAddress = '0xC2DbaAEA2EfA47EBda3E572aa0e55B742E408BF6';

export const StIbAlluoETHAddress = '0x2D4Dc956FBd0044a4EBA945e8bbaf98a14025C2d'; //available
export const IbAlluoETHAddress = '0xc677B0918a96ad258A68785C2a3955428DeA7e50';

export const StIbAlluoBTCAddress = '0x3E70E15c189e1FFe8FF44d713605528dC1701b63';
export const IbAlluoBTCAddress = '0xf272Ff86c86529504f0d074b210e95fc4cFCDce2';

export const tokenArray = [
	RICAddress,
	WMATICAddress,
	MATICxAddress,
	DAIAddress,
	DAIxAddress,
	USDCAddress,
	USDCxAddress,
	WETHxAddress,
	WETHAddress,
	WBTCAddress,
	WBTCxAddress,
	StIbAlluoBTCAddress,
	IbAlluoBTCAddress,
	StIbAlluoETHAddress,
	IbAlluoETHAddress,
	IbAlluoUSDAddress,
	StIbAlluoUSDAddress,
	RexHatAddress,
	RexShirtAddress,
];

export const supportedCurrencies = [
	{
		currency: 'DAIx',
		address: DAIxAddress,
	},

	{
		currency: 'USDCx',
		address: USDCxAddress,
	},

	{
		currency: 'WETHx',
		address: WETHxAddress,
	},
	{
		currency: 'WBTCx',
		address: WBTCxAddress,
	},

	{
		currency: 'MATICx',
		address: MATICxAddress,
	},
	{
		currency: 'RIC',
		address: RICAddress,
	},
	{
		currency: 'StIbAlluoETH',
		address: StIbAlluoETHAddress,
	},
	{
		currency: 'StIbAlluoUSD',
		address: StIbAlluoUSDAddress,
	},
	{
		currency: 'StIbAlluoBTC',
		address: StIbAlluoBTCAddress,
	},
];

export const marketArray = [
	twoWayMarketibAlluoUSDETHAddress,
	twoWayMarketibAlluoUSDBTCAddress,
	twoWayMarketMATICDAIAddress,
	twoWayMarketMATICUSDCAddress,
	twoWayMarketWBTCDAIAddress,
	twoWayMarketDAIWETHAddress,
	twoWayMarketWBTCAddress,
	twoWayWETHMarketAddress,
	twoWayMarketRICUSDCAddress,
	ricRexShirtLaunchpadAddress,
	ricRexHatLaunchpadAddress,
];

// V1 Markets Deprecated //

//ETH X USDC
export const wethxUsdcxExchangeAddress = '0x3941e2E89f7047E0AC7B9CcE18fBe90927a32100';

//BTC X USDC
export const wbtcxUsdcxExchangeAddress = '0x71f649EB05AA48cF8d92328D1C486B7d9fDbfF6b';

//USDC X ETH
export const usdcxWethxExchangeAddress = '0x8082Ab2f4E220dAd92689F3682F3e7a42b206B42';

//USDC X BTC
export const usdcxWbtcxExchangeAddress = '0xe0A0ec8dee2f73943A6b731a2e11484916f45D44';

//DAI X ETH
export const daixEthxExchangeAddress = '0x9BEf427fa1fF5269b824eeD9415F7622b81244f5';

//ETH X DAI
export const ethxDaixExchangeAddress = '0x0A70Fbb45bc8c70fb94d8678b92686Bb69dEA3c3';

//USDC X MATIC
export const usdcxMaticxExchangeAddress = '0xE093D8A4269CE5C91cD9389A0646bAdAB2c8D9A3';

//MATIC X USDC
export const maticxUsdcxExchangeAddress = '0x93D2d0812C9856141B080e9Ef6E97c7A7b342d7F';

//DAI X MATIC
export const daixMaticxExchangeAddress = '0xA152715dF800dB5926598917A6eF3702308bcB7e';

//MATIC X DAI
export const maticxDaixExchangeAddress = '0x250efbB94De68dD165bD6c98e804E08153Eb91c6';

//USDC X RIC
export const usdcxRicExchangeAddress = '0x98d463A3F29F259E67176482eB15107F364c7E18';

//USDC X IBALLUOUSD
export const usdcxibAlluoUSDAddress = '0xE53dd10d49C8072d68d48c163d9e1A219bd6852D';

//Deprecated Waterdrop

export const claimAddress = '0x9dA677c3423E0eBc1e3d7c0a86e9b9a34Bbd2874';
