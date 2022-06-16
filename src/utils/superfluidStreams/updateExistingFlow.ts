import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import { gas } from 'api/gasEstimator';
import { showErrorToast, showSuccessToast } from '../../components/common/Toaster';

async function updateExistingFlow(recipient: string, flowRate: string, token: string, web3: any) {
	console.log(typeof flowRate);
	if (web3) {
		const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
		const chainId = Number(process.env.REACT_APP_CHAIN_ID);

		const sf = await Framework.create({
			chainId: Number(chainId),
			provider,
		});
		const signer = provider.getSigner();
		try {
			const updateFlowOperation = sf.cfaV1.updateFlow({
				flowRate,
				receiver: recipient,
				superToken: token,
				overrides: {
					...(await gas()),
				},
			});
			await updateFlowOperation.exec(signer);
			showSuccessToast('Stream updated successfully');
		} catch (error) {
			showErrorToast('Could not update stream, check your stream and try again later.');
		}
	}
}

export default updateExistingFlow;
