import { ethers } from 'ethers';

export const gas = async () => {
  try {
    const gasResponse = await fetch('https://gasstation-mainnet.matic.network/v2')
      .then(async (response) => response.json())
      .catch(() => ({}));
    const { maxPriorityFee, maxFee } = (gasResponse && gasResponse.fast) || {};
    const toFixedMaxPriorityFee = maxPriorityFee.toFixed(8);
    const toFixedMaxFee = maxFee.toFixed(8);
    return {
      maxPriorityFeePerGas: ethers.utils.hexlify(ethers.utils.parseUnits(toFixedMaxPriorityFee, 'gwei')?.toNumber()),
      maxFeePerGas: ethers.utils.hexlify(
        ethers.utils.parseUnits(toFixedMaxFee, 'gwei')?.toNumber(),
      ),
    };
  } catch (error) {
    return {};
  }
};
