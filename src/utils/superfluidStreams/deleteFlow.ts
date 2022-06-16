import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import { showErrorToast, showSuccessToast } from '../../components/common/Toaster';
import { gas } from 'api/gasEstimator';

async function deleteFlow(sender: string, recipient: string, token: string, web3: any) {
	if (web3) {
		const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
		const chainId = Number(process.env.REACT_APP_CHAIN_ID);

		const sf = await Framework.create({
			chainId: Number(chainId),
			provider,
		});

		const signer = provider.getSigner();

		try {
			const deleteFlowOperation = sf.cfaV1.deleteFlow({
				sender,
				receiver: recipient,
				superToken: token,
				overrides: {
					...(await gas()),
				},
			});

			await deleteFlowOperation.exec(signer);
			showSuccessToast('Stream deleted successfully');
		} catch (error) {
			showErrorToast('There was an issue deleting your stream, try again later.');
		}
	}
}

export default deleteFlow;
