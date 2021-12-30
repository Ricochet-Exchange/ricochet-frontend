import { put, call, all } from 'redux-saga/effects';
import { mainGetReadOnlyData, mainSetState } from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';
import { Unwrap } from '../../../types/unwrap';
import { getCoingeckoPrices } from '../../../utils/getCoingeckoPrices';

export function* loadReadOnlyData() {
  try {
    yield put(mainSetState({ isLoading: true, isReadOnly: true }));
    yield all([
      call(sweepQueryFlow),
    ]);
    const coingeckoPrices: Unwrap<typeof getCoingeckoPrices> = yield call(getCoingeckoPrices);
    yield put(mainSetState({
      coingeckoPrices,
      isLoading: false,
    }));
  } catch (e) {
    if (process.env.REACT_APP_API_NODE_URL) yield put(mainGetReadOnlyData());
    else throw new Error(`Missing mandatory environment variable REACT_APP_API_NODE_URL. Error: ${e?.message}`);
  }
}
