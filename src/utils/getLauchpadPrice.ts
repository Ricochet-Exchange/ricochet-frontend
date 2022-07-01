import Web3 from 'web3';
import { getContract } from 'utils/getContract';
import { usdcxRicExchangeAddress } from 'constants/polygon_config';
import { launchpadABI } from 'constants/abis';
import { fromWei } from 'utils/balances';

// load abi, create contract instance, get price, normalize price, quicc maths, return
export const getLauchpadPrice = async (web3: Web3): Promise<string> => {
	const contract = getContract(usdcxRicExchangeAddress, launchpadABI, web3);
	const price = await contract.methods.getSharePrice().call();
	const normalizedPrice = typeof price === 'string' ? price : price.toString();
	return fromWei(normalizedPrice, 18);
};
