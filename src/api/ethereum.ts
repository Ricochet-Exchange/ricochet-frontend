import { getSuperFluid } from 'utils/fluidSDKinstance';
import { getAddress } from 'utils/getAddress';
import { chainSettings } from 'constants/chainSettings';
import web3 from 'utils/web3instance';
import { CoinOption } from 'types/coinOption';
import { RICAddress } from 'constants/polygon_config';

export const downgrade = (
  contract: any,
  amount: string,
  address: string,
) => contract.methods
  .downgrade(amount)
  .send({ from: address });

export const allowance = (
  contract: any,
  address: string,
  superTokenAddress: string,
) => contract.methods
  .allowance(address, superTokenAddress)
  .call();

export const approve = (
  contract: any,
  address: string,
  tokenAddress: string,
  amount: string,
) => contract.methods
  .approve(tokenAddress, amount)
  .send({ from: address });

export const upgrade = (
  contract: any,
  amount: string,
  address: string,
) => contract.methods
  .upgrade(amount)
  .send({ from: address });

export const approveSubscription = async (tokenAddress:string, exchangeAddress:string) => {
  const superFluid = await getSuperFluid();

  const call = [
    [
      201, // approve the ticket fee
      superFluid.agreements.ida.address,
      web3.eth.abi.encodeParameters(
        ['bytes', 'bytes'],
        [
          superFluid.agreements.ida.contract.methods
            .approveSubscription(
              tokenAddress,
              exchangeAddress,
              1, // INDEX_ID
              '0x',
            )
            .encodeABI(), // callData
          '0x', // userData
        ],
      ),
    ],
  ];
  await superFluid.host.batchCall(call);
};

export const stopFlow = async (exchangeAddress: string, inputTokenAddress: string) => {
  const address = await getAddress();
  const superFluid = await getSuperFluid();
  const sfUser = superFluid.user({
    address,
    token: inputTokenAddress,
  });
  try {
    const recipient = await superFluid.user({
      address: exchangeAddress,
      token: inputTokenAddress,
    });
    await sfUser.flow({
      recipient,
      flowRate: '0',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const startFlow = async (
  idaContract: any,
  exchangeAddress:string,
  inputTokenAddress: string,
  outputTokenAddress:string,
  amount: number,
) => {
  const address = await getAddress();
  const superFluid = await getSuperFluid();
  const sfUser = superFluid.user({
    address,
    token: inputTokenAddress,
  });
  let call = [];
  const isSubscribed = await idaContract.methods
    .getSubscription(
      outputTokenAddress,
      exchangeAddress, // publisher
      0, // indexId
      sfUser.address,
    )
    .call();
  try {
    if (isSubscribed.approved) {
      await sfUser.flow({
        recipient: await superFluid.user({
          address: exchangeAddress,
          token: inputTokenAddress,
        }), // address: would be rickosheaAppaddress, currently not deployed
        flowRate: amount.toString(),
      });
    } else {
      if (outputTokenAddress === RICAddress) {
        call = [
          [
            201, // approve the ticket fee
            superFluid.agreements.ida.address,
            web3.eth.abi.encodeParameters(
              ['bytes', 'bytes'],
              [
                superFluid.agreements.ida.contract.methods
                  .approveSubscription(
                    outputTokenAddress,
                    exchangeAddress,
                    0, // INDEX_ID
                    '0x',
                  )
                  .encodeABI(), // callData
                '0x', // userData
              ],
            ),
          ],
          [
            201, // create constant flow (10/mo)
            superFluid.agreements.cfa.address,
            web3.eth.abi.encodeParameters(
              ['bytes', 'bytes'],
              [
                superFluid.agreements.cfa.contract.methods
                  .createFlow(
                    inputTokenAddress,
                    exchangeAddress,
                    amount.toString(),
                    '0x',
                  )
                  .encodeABI(), // callData
                '0x', // userData
              ],
            ),
          ],
        ];
      } else {
        call = [
          [
            201, // approve the ticket fee
            superFluid.agreements.ida.address,
            web3.eth.abi.encodeParameters(
              ['bytes', 'bytes'],
              [
                superFluid.agreements.ida.contract.methods
                  .approveSubscription(
                    outputTokenAddress,
                    exchangeAddress,
                    0, // INDEX_ID
                    '0x',
                  )
                  .encodeABI(), // callData
                '0x', // userData
              ],
            ),
          ],
          [
            201, // approve the RIC subsidy
            superFluid.agreements.ida.address,
            web3.eth.abi.encodeParameters(
              ['bytes', 'bytes'],
              [
                superFluid.agreements.ida.contract.methods
                  .approveSubscription(
                    RICAddress,
                    exchangeAddress,
                    1, // INDEX_ID
                    '0x',
                  )
                  .encodeABI(), // callData
                '0x', // userData
              ],
            ),
          ],
          [
            201, // create constant flow (10/mo)
            superFluid.agreements.cfa.address,
            web3.eth.abi.encodeParameters(
              ['bytes', 'bytes'],
              [
                superFluid.agreements.cfa.contract.methods
                  .createFlow(
                    inputTokenAddress,
                    exchangeAddress,
                    amount.toString(),
                    '0x',
                  )
                  .encodeABI(), // callData
                '0x', // userData
              ],
            ),
          ],
        ];
      }
      await superFluid.host.batchCall(call);
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const switchNetwork = async () => {
  const { ethereum } = window as any;
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainSettings.chainId }],
    });

    return true;
  } catch (error) {
    if (error.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: chainSettings.chainId,
            chainName: chainSettings.chanName,
            nativeCurrency: chainSettings.nativeCurrency,
            rpcUrls: chainSettings.rpcUrls,
            blockExplorerUrls: chainSettings.blockExplorerUrls,
          }],
        });
        return true;
      } catch (e) {
        throw new Error(error);
      }
    }

    if (error.code === 4001) { // User rejected the request.
      throw new Error(error);
    }
  }
};

export const registerToken = async (options: CoinOption) => {
  const tokenAdded = await (window as any).ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options,
    },
  });

  return tokenAdded;
};
