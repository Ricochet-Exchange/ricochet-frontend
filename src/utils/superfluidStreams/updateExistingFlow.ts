import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';

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

      console.log('Updating your stream...');
 
      const result = await updateFlowOperation.exec(signer);
  
      console.log(result);
      return 'Stream updated successfully';
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!",
      );
      console.error(error);
      return 'Stream could not be updated successfully, check if this stream exists.';
    }
  }
}

export default updateExistingFlow;
