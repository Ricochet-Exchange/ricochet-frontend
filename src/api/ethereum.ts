import { getSuperFluid } from 'utils/fluidSDKinstance';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { chainSettings } from 'constants/chainSettings';
import web3 from 'utils/web3instance';
import { CoinOption } from 'types/coinOption';
import {
  RICAddress,
  SLPxAddress,
  SUSHIxAddress,
  MATICxAddress,
} from 'constants/polygon_config';
import Erc20Abi from 'constants/Erc20.json';
import Erc20Bytes32Abi from 'constants/Erc20bytes32.json';
import BankAbi from 'constants/Bank.json';

const gasPrice = 35_000_000_000; // 35 gwei default gas

export const downgrade = (
  contract: any,
  amount: string,
  address: string,
) => contract.methods
  .downgrade(amount)
  .send({ 
    from: address, 
    gasPrice,
  });
  
export const downgradeMatic = (
  contract: any,
  amount: string,
  address: string,
) => contract.methods
  .downgradeToETH(amount)
  .send({ 
    from: address, 
    // value: amount,
    gasPrice,
  });

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
  .send({ 
    from: address, 
    gasPrice,
  });

export const upgrade = (
  contract: any,
  amount: string,
  address: string,
) => contract.methods
  .upgrade(amount)
  .send({ 
    from: address, 
    gasPrice,
  });

export const upgradeMatic = (
  contract: any,
  amount: string,
  address: string,
) => {
  contract.methods
    .upgradeByETH()
    .send({ 
      from: address, 
      value: amount,
      gasPrice,
    });
};

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
      } else if (outputTokenAddress === SLPxAddress) {
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
            201, // approve the SUSHIx rewards subsidy
            superFluid.agreements.ida.address,
            web3.eth.abi.encodeParameters(
              ['bytes', 'bytes'],
              [
                superFluid.agreements.ida.contract.methods
                  .approveSubscription(
                    SUSHIxAddress,
                    exchangeAddress,
                    2, // INDEX_ID
                    '0x',
                  )
                  .encodeABI(), // callData
                '0x', // userData
              ],
            ),
          ],
          [
            201, // approve the MATICx rewards
            superFluid.agreements.ida.address,
            web3.eth.abi.encodeParameters(
              ['bytes', 'bytes'],
              [
                superFluid.agreements.ida.contract.methods
                  .approveSubscription(
                    MATICxAddress,
                    exchangeAddress,
                    3, // INDEX_ID
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

export const getVaultData = async (
  contract: any,
  accountAddress: string,
  bankAddress: string,
) => {
  const collateralAmount = await contract.methods
    .getVaultCollateralAmount()
    .call({ from: accountAddress });
  const repayAmount = await contract.methods
    .getVaultRepayAmount()
    .call({ from: accountAddress });
  const debtAmount = await contract.methods
    .getVaultDebtAmount()
    .call({ from: accountAddress });

  let collateralizationRatio = 0;
  if (accountAddress) {
    collateralizationRatio = await contract.methods
      .getVaultCollateralizationRatio(accountAddress)
      .call();
  }

  let hasVault = +debtAmount > 0 || +collateralAmount > 0;
  if (bankAddress !== '0xaD39F774A75C7673eE0c8Ca2A7b88454580D7F53') {
    hasVault = true;
  }

  return {
    collateralAmount,
    repayAmount,
    debtAmount,
    collateralizationRatio,
    hasVault,
  };
};

export const getCollateralTokenData = async (
  contract: any,
  accountAddress: string,
) => {
  const collateralTokenAddress = await contract.methods
    .getCollateralTokenAddress()
    .call();

  const tokenContract = getContract(
    collateralTokenAddress,
    Erc20Abi,
  );

  const token32Contract = getContract(
    collateralTokenAddress,
    Erc20Bytes32Abi,
  );

  const unlockedAmount = accountAddress ? await tokenContract.methods
    .allowance(accountAddress, collateralTokenAddress)
    .call() : 0;

  let symbol;
  try {
    symbol = await tokenContract.methods.symbol().call();
  } catch {
    symbol = await token32Contract.methods.symbol().call();
  }

  if (symbol.indexOf('0x') > -1) {
    symbol = web3.utils.toUtf8(symbol);
  }

  let decimals;
  try {
    decimals = await tokenContract.methods.decimals().call();
  } catch {
    decimals = 18;
  }

  const price = await contract.methods.getCollateralTokenPrice().call();
  const granularityPrice = await contract.methods
    .getCollateralTokenPriceGranularity()
    .call();

  return {
    address: collateralTokenAddress,
    symbol,
    decimals,
    unlockedAmount,
    price,
    granularityPrice,
  };
};

export const getDebtTokenData = async (
  contract: any,
  accountAddress: string,
) => {
  const debtTokenAddress = await contract.methods
    .getDebtTokenAddress()
    .call();

  const tokenContract = getContract(
    debtTokenAddress,
    Erc20Abi,
  );

  const token32Contract = getContract(
    debtTokenAddress,
    Erc20Bytes32Abi,
  );
  const unlockedAmount = accountAddress ? await tokenContract.methods
    .allowance(accountAddress, debtTokenAddress)
    .call() : 0;

  let symbol;
  try {
    symbol = await tokenContract.methods.symbol().call();
  } catch {
    symbol = await token32Contract.methods.symbol().call();
  }

  if (symbol.indexOf('0x') > -1) {
    symbol = web3.utils.toUtf8(symbol);
  }

  let decimals;
  try {
    decimals = await tokenContract.methods.decimals().call();
  } catch {
    decimals = 18;
  }

  const price = await contract.methods.getDebtTokenPrice().call();
  const granularityPrice = await contract.methods
    .getDebtTokenPriceGranularity()
    .call();

  return {
    address: debtTokenAddress,
    symbol,
    decimals,
    unlockedAmount,
    price,
    granularityPrice,
  };
};

export const getBankData = async (
  bankAddress: string,
  address: string,
) => {
  const bankContract = getContract(bankAddress, BankAbi.abi);
  const vault = await getVaultData(bankContract, address, bankAddress);
  const debtToken = await getDebtTokenData(bankContract, address);
  const collateralToken = await getCollateralTokenData(bankContract, address);
  const name = bankAddress === '0x91093c77720e744F415D33551C2fC3FAf7333c8c' ? 
    '✨ REX Bank' : await bankContract.methods.getName().call();
  const interestRate = await bankContract.methods.getInterestRate().call();
  const originationFee = await bankContract.methods.getOriginationFee().call();
  const collateralizationRatio = await bankContract.methods
    .getCollateralizationRatio()
    .call();
  const liquidationPenalty = await bankContract.methods
    .getLiquidationPenalty()
    .call();
  const reserveBalance = await bankContract.methods.getReserveBalance().call();
  const reserveCollateralBalance = await bankContract.methods
    .getReserveCollateralBalance()
    .call();

  return [{
    bankAddress,
    vault,
    debtToken,
    collateralToken,
    interestRate,
    originationFee,
    collateralizationRatio,
    liquidationPenalty,
    reserveBalance,
    reserveCollateralBalance,
    name,
  }];
};

export const makeDeposit = async (
  bankContract: any,
  accountAddress: string,
  depositAmount: string,
) => {
  const amount = (+depositAmount * 1e18).toLocaleString('fullwide', { useGrouping: false });
  let transactionHash;
  const deposit = await bankContract.methods
    .vaultDeposit(amount)
    .send({ from: accountAddress })
    .once('transactionHash', (txHash: string) => {
      transactionHash = txHash;
    })
    .then((resp: string) => (resp));
  return { deposit, transactionHash };
};

export const makeBorrow = async (
  bankContract: any,
  accountAddress: string,
  borrowAmount: string,
) => {
  const amount = (+borrowAmount * 1e18).toLocaleString('fullwide', { useGrouping: false });
  let transactionHash;
  const borrow = await bankContract.methods
    .vaultBorrow(amount)
    .send({ from: accountAddress })
    .once('transactionHash', (txHash: string) => {
      transactionHash = txHash;
    })
    .then((resp: string) => (resp));
  return { borrow, transactionHash };
};

export const approveToken = async (
  accountAddress: string,
  bankAddress: string,
  tokenContract: any,
  wad?: any,
) => {
  const mainWad = wad || web3.utils
    .toBN(2)
    .pow(web3.utils.toBN(255));
  console.log(tokenContract);
  const approveRes = await tokenContract.methods
    .approve(bankAddress, mainWad)
    .send({ from: accountAddress })
    .once('transactionHash', (txHash: string) => {
      console.log(txHash);
    })
    .then((resp: string) => (resp));

  return approveRes;
};

export const makeWithdraw = async (
  bankContract: any,
  accountAddress: string,
  withdrawAmount: string,
) => {
  const amount = (+withdrawAmount * 1e18).toLocaleString('fullwide', { useGrouping: false });
  let transactionHash;
  const whithdraw = await bankContract.methods
    .vaultWithdraw(amount)
    .send({ from: accountAddress })
    .once('transactionHash', (txHash: string) => {
      transactionHash = txHash;
    })
    .then((resp: string) => (resp));
  return { whithdraw, transactionHash };
};

export const makeRepay = async (
  bankContract: any,
  accountAddress: string,
  repayAmount: string,
) => {
  const amount = (+repayAmount * 1e18).toLocaleString('fullwide', { useGrouping: false });
  let transactionHash;
  const repay = await bankContract.methods
    .vaultRepay(amount)
    .send({ from: accountAddress })
    .once('transactionHash', (txHash: string) => {
      transactionHash = txHash;
    })
    .then((resp: string) => (resp));
  return { repay, transactionHash };
};
