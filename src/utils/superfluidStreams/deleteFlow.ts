import { Framework } from '@superfluid-finance/sdk-core';

async function deleteFlow(sender: string, recipient: string, token: string) {
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
      const deleteFlowOperation = sf.cfaV1.deleteFlow({
        sender,
        receiver: recipient,
        superToken: token,
        // userData?: string
      });

      await deleteFlowOperation.exec(signer);
      console.log('success');
    } catch (error) {
      console.error(error);
    }
  }
}

export default deleteFlow;
