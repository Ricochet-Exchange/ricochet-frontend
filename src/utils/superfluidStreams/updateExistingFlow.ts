import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import { showErrorToast, showSuccessToast } from '../../components/common/Toaster';

async function updateExistingFlow(recipient: string, flowRate: string, token: string) {
  console.log(typeof flowRate);
  if (window.ethereum) {
    // @ts-expect-error
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = Number(await window.ethereum.request({ method: 'eth_chainId' }));
  
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
        // userData?: string
      });
      await updateFlowOperation.exec(signer);
      showSuccessToast('Stream updated successfully');
    } catch (error) {
      showErrorToast('Could not update stream, check your stream and try again later.');
    }
  }
}

export default updateExistingFlow;
