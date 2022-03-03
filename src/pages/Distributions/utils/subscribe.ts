import Web3 from 'web3';
import { getSuperFluid } from '../../../utils/fluidSDKinstance';
import { truncateAddr } from '../../../utils/helpers';

const subscribe = async (
  web3: Web3,
  token:string,
  indexId:number,
  publisher:string,
  subscriber:string,
  onPending:(args:string)=> void,
  onSuccess:(args:string)=> void,
  onError:(args:any)=> void,
) => {
  try {
    onPending('Initiating transaction');
    const superFluid = await getSuperFluid(web3, []);
    superFluid.ida.approveSubscription({
      superToken: token,
      publisher,
      indexId,
      subscriber,
      onTransaction: async (transactionHash:string) => {
        onSuccess(`Successfully submitted, tx ${truncateAddr(transactionHash)}`);
      },
    });
  } catch (e:any) {
    console.log(e);
    onError(e);
  }
};

export default subscribe;
