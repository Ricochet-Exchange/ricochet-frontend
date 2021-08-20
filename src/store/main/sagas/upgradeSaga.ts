import { upgrade } from 'api/ethereum';
import { superTokenABI } from 'constants/abis';
import { DAIxAddress, WETHxAddress } from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { handleError } from 'utils/handleError';
import { daiUpgrade, wethUpgrade } from '../actionCreators';
import { checkIfApproveDai, checkIfApproveWeth } from './checkIfApprove';
import { getBalances } from './getBalances';

export function* upgradeSaga(
  tokenAddress: string, 
  value: string,
) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract, 
    tokenAddress,
    superTokenABI,
  );
  const amount = web3.utils.toWei(value, 'ether');
  yield call(upgrade, contract, amount, address);
  yield call(getBalances, address);
} 

export function* upgradeDaiSaga({ payload }: ReturnType<typeof daiUpgrade>) {
  try {
    const amount = web3.utils.toWei(payload.value, 'ether');
    yield call(upgradeSaga, DAIxAddress, amount);
    payload.callback();
    yield call(checkIfApproveDai);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  } 
} 

export function* upgradeWethSaga({ payload }: ReturnType<typeof wethUpgrade>) {
  try {
    const amount = web3.utils.toWei(payload.value, 'ether');
    yield call(upgradeSaga, WETHxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWeth);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  } 
} 
