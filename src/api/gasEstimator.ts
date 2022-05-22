import { ethers } from 'ethers';

const GAS_STATION_MATIC_URL = 'https://gasstation-mainnet.matic.network/v2';
export const gas = async () => {
	try {
		const gasResponse = await fetch(GAS_STATION_MATIC_URL)
			.then(async (response) => response.json())
			.catch(() => ({}));
		const { maxPriorityFee, maxFee } = (gasResponse && gasResponse.fast) || {};
		const toFixedMaxPriorityFee = maxPriorityFee.toFixed(8);
		const toFixedMaxFee = maxFee.toFixed(8);
		return {
			maxPriorityFeePerGas: ethers.utils.hexlify(
				ethers.utils.parseUnits(toFixedMaxPriorityFee, 'gwei')?.toNumber(),
			),
			maxFeePerGas: ethers.utils.hexlify(ethers.utils.parseUnits(toFixedMaxFee, 'gwei')?.toNumber()),
		};
	} catch (error) {
		return {};
	}
};
