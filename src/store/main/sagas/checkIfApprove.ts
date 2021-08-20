import { call, put, select } from 'redux-saga/effects';
import { getContract } from 'utils/getContract';
import { erc20ABI } from 'constants/abis';
import { Unwrap } from 'types/unwrap';
import { allowance } from 'api/ethereum';
import { getAddress } from 'utils/getAddress';
import {
  DAIAddress, DAIxAddress, WETHAddress, WETHxAddress, 
} from 'constants/polygon_config';
import { handleError } from 'utils/handleError';
import { mainSetState } from '../actionCreators';
import { selectBalances } from '../selectors';

export function* checkIfApprove(
  tokenAddress: string,
  superTokenAddress: string,
  param: 'hasWethApprove' | 'hasDaiApprove',
) {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const contract: Unwrap<typeof getContract> = yield call(
    getContract, 
    tokenAddress,
    erc20ABI,
  );
  const amount: Unwrap<typeof allowance> = yield call(allowance,
    contract, address, superTokenAddress);
  const balances: ReturnType<typeof selectBalances> = yield select(selectBalances); 
  const hasApprove = Number(amount) > Number(balances && balances[superTokenAddress]);
  yield put(mainSetState({ [param]: hasApprove }));
}

export function* checkIfApproveWeth() {
  try {
    yield call(checkIfApprove, WETHAddress, WETHxAddress, 'hasWethApprove');
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  } 
}

export function* checkIfApproveDai() {
  try {
    yield call(checkIfApprove, DAIAddress, DAIxAddress, 'hasDaiApprove');
  } catch (e) {
    // TODO: handle errors properly
    yield call(handleError, e);
  }  
}
