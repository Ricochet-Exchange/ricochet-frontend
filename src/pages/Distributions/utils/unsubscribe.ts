import Web3 from 'web3';
import { getSuperFluid } from '../../../utils/fluidSDKinstance';

const unsubscribe = async (
  web3: Web3,
  token:string,
  indexId:number,
  publisher:string,
  subscriber:string,
  onPending:(args:string)=> void,
  onSuccess:(args:string)=> void,
  onError:(args:string)=> void,
) => {
  onPending('Initiating transaction');
  const superFluid = await getSuperFluid(web3, []);
  superFluid.ida.revokeSubscription({
    superToken: token,
    publisher,
    indexId,
    subscriber,
  }).then(onSuccess).catch(onError);
};

export default unsubscribe;
