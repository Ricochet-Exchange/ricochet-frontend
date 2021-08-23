import { approve } from 'api/ethereum';
import { erc20ABI } from 'constants/abis';
import {
  DAIAddress, DAIxAddress, WETHAddress, WETHxAddress, 
} from 'constants/polygon_config';
import { call } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import web3 from 'utils/web3instance';
import { handleError } from 'utils/handleError';
import { daiApprove, wethApprove } from '../actionCreators';
import { checkIfApproveDai, checkIfApproveWeth } from './checkIfApprove';
import { getBalances } from './getBalances';

export function* approveSaga(
  tokenAddress: string,
  superTokenAddress: string,
  amount: string,
) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract, 
    tokenAddress,
    erc20ABI,
  );
  yield call(approve, contract, address, superTokenAddress, amount);
  yield call(getBalances, address);
}

export function* approveDaiSaga({ payload }: ReturnType<typeof daiApprove>) {
  try {
    const amount = web3.utils.toWei(payload.value, 'ether');
    yield call(approveSaga, DAIAddress, DAIxAddress, amount);
    payload.callback();
    yield call(checkIfApproveDai);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  } 
} 

export function* approveWethSaga({ payload }: ReturnType<typeof wethApprove>) {
  try {
    const amount = web3.utils.toWei(payload.value, 'ether');
    yield call(approveSaga, WETHAddress, WETHxAddress, amount);
    payload.callback();
    yield call(checkIfApproveWeth);
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  } 
}  
