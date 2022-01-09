import {
  put, call, all, select, 
} from 'redux-saga/effects';
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
  checkIfApproveIdle,
} from './checkIfApprove';
import { getBalances } from './getBalances';
import { sweepQueryFlow } from './sweepQueryFlow';
import { selectMain } from '../selectors';
import { getCoingeckoPrices } from '../../../utils/getCoingeckoPrices';

export function* loadData() {
  try {
    yield put(mainSetState({ isLoading: true }));
    const main: ReturnType<typeof selectMain> = yield select(selectMain);
    const { web3 } = main;
    const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
    const coingeckoPrices: Unwrap<typeof getCoingeckoPrices> = yield call(getCoingeckoPrices);
    yield call(getBalances, address);
    yield all([
      call(checkIfApproveUsdc),
      call(checkIfApproveMkr),
      call(checkIfApproveDai),
      call(checkIfApproveWeth),
      call(checkIfApproveWbtc),
      call(checkIfApproveSushi),
      call(checkIfApproveIdle),
      call(checkIfApproveMatic),
      call(sweepQueryFlow),
    ]);
    yield put(mainSetState({
      address,
      coingeckoPrices,
      isLoading: false,
    }));
  } catch (e) {
    yield put(mainGetData());
  }
}
