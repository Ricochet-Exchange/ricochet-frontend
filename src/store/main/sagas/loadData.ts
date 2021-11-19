import { put, call, all } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { mainGetData, mainSetState } from '../actionCreators';
import {
  checkIfApproveUsdc,
  checkIfApproveWeth,
  checkIfApproveWbtc,
  checkIfApproveMkr,
  checkIfApproveDai,
  checkIfApproveSushi,
  checkIfApproveMatic,
} from './checkIfApprove';
import { getBalances } from './getBalances';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* loadData() {
  try {
    yield put(mainSetState({ isLoading: true }));
    const address: Unwrap<typeof getAddress> = yield call(getAddress);
    yield call(getBalances, address); 
    yield all([
      call(checkIfApproveUsdc),
      call(checkIfApproveMkr),
      call(checkIfApproveDai),
      call(checkIfApproveWeth),
      call(checkIfApproveWbtc),
      call(checkIfApproveSushi),
      call(checkIfApproveMatic),
      call(sweepQueryFlow),
    ]);
    yield put(mainSetState({
      address,
      isLoading: false,
    }));
  } catch (e) {
    yield put(mainGetData());
  } 
}
