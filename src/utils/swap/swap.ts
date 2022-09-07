import { SwapABI } from 'constants/abis';
import { SwapContract } from 'constants/contracts';

export const swap = async (params: any, web3: any, address: any) => {
	params = {
		_from: '0xCAa7349CEA390F89641fe306D93591f87595dc1F',
		_to: '0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2',
		amountIn: '5',
		amountOutMin: '0',
		path: ['0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'],
		poolFees: ['500'],
		_hasUnderlyingFrom: true,
		_hasUnderlyingTo: true,
	};

	let web3ToUse;

	if (!window.ethereum || !web3.currentProvider) {
		return;
	}

	web3.eth.handleRevert = true;

	web3ToUse = web3;

	const contract = new web3ToUse.eth.Contract(SwapABI as any, SwapContract);

	try {
		const method = contract.methods.swap(
			params._from,
			params._to,
			params.amountIn,
			params.amountOutMin,
			params.path,
			params.poolFees,
			params._hasUnderlyingFrom,
			params._hasUnderlyingTo,
		);
		const tx = await method.send({
			from: address,
		});

		return tx;
	} catch (error) {
		// here do all error handling to readable stuff
		console.log(error);
		throw error;
	}
};
