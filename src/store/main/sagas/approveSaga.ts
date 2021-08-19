import { approve } from 'api/ethereum';
import { erc20ABI } from 'constants/abis';
import {
  DAIAddress, DAIxAddress, WETHAddress, WETHxAddress, 
} from 'constants/polygon_config';
import { all, call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { daiApprove, mainSetState, wethApprove } from '../actionCreators';
import { checkIfApproveDai, checkIfApproveWeth } from './checkIfApprove';
import { getBalances } from './getBalances';

export function* approveSaga(tokenAddress: string, superTokenAddress: string) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract, 
    tokenAddress,
    erc20ABI,
  );
  yield all([
    call(approve, contract, address, superTokenAddress),
    call(getBalances, address),
  ]);
}

export function* approveDaiSaga({ payload }: ReturnType<typeof daiApprove>) {
  try {
    yield call(approveSaga, DAIAddress, DAIxAddress);
    payload.callback();
    yield call(checkIfApproveDai);
  } catch (e) {
    yield put(mainSetState({ disabled: true }));
  } 
} 

export function* approveWethSaga({ payload }: ReturnType<typeof wethApprove>) {
  try {
    yield call(approveSaga, WETHAddress, WETHxAddress);
    payload.callback();
    yield call(checkIfApproveWeth);
  } catch (e) {
    yield put(mainSetState({ disabled: true }));
  } 
}  
