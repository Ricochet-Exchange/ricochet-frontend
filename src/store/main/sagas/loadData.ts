import { isLoadingAllTrue, isLoadingAllFalse } from 'constants/index';
import { put, call, all } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { mainGetData, mainSetState } from '../actionCreators';
import {
  checkIfApproveUsdc,
  checkIfApproveWeth,
  checkIfApproveWbtc,
} from './checkIfApprove';
import { getBalances } from './getBalances';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* loadData() {
  try {
    yield put(mainSetState({ ...isLoadingAllTrue }));
    const address: Unwrap<typeof getAddress> = yield call(getAddress);
    yield call(getBalances, address); 
    yield all([
      call(checkIfApproveUsdc),
      call(checkIfApproveWeth),
      call(checkIfApproveWbtc),
      call(sweepQueryFlow),
    ]);
    yield put(mainSetState({
      address,
      ...isLoadingAllFalse, 
    }));
  } catch (e) {
    yield put(mainGetData());
  } 
}
