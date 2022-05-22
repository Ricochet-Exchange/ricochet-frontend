import Web3 from 'web3';
import { ethers } from 'ethers';
import { getSFFramework } from '../../../utils/fluidSDKinstance';
import { truncateAddr } from '../../../utils/helpers';
import { gas } from '../../../api/gasEstimator';

const subscribe = async (
	web3: Web3,
	token: string,
	indexId: number,
	publisher: string,
	subscriber: string,
	onPending: (args: string) => void,
	onSuccess: (args: string) => void,
	onError: (args: any) => void,
) => {
	try {
		onPending('Initiating transaction');
		const framework = await getSFFramework(web3);
		const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
		const signer = provider.getSigner();
		const { maxFeePerGas, maxPriorityFeePerGas } = await gas();
		const executedResponse = await framework.idaV1
			.approveSubscription({
				superToken: token,
				publisher,
				indexId: indexId.toString(),
				overrides: {
					maxFeePerGas,
					maxPriorityFeePerGas,
				},
			})
			.exec(signer);
		onSuccess(`Successfully submitted, tx ${truncateAddr(executedResponse.hash)}`);
	} catch (e: any) {
		onError(e);
	}
};

export default subscribe;
