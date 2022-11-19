import { SwapABI } from 'constants/abis';
import { SwapContract } from 'constants/contracts';
import { gas } from 'api/gasEstimator';

export const swap = async (params: any, web3: any, address: any) => {
	if (!params) {
		console.log('bad passdown');
		return;
	}

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
			...(await gas()),
		});
		return tx;
	} catch (error) {
		// here do all error handling to readable stuff
		console.log(error);
		return;
	}
};
