import { put, call, all } from 'redux-saga/effects';
import { mainGetReadOnlyData, mainSetState } from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';

export function* loadReadOnlyData() {
  try {
    yield put(mainSetState({ isLoading: true, isReadOnly: true }));
    yield all([
      call(sweepQueryFlow),
    ]);
    yield put(mainSetState({
      isLoading: false,
    }));
  } catch (e) {
    if (process.env.REACT_APP_API_NODE_URL) yield put(mainGetReadOnlyData());
    else console.error('Missing mandatory environment variable REACT_APP_API_NODE_URL, ', e);
  } 
}
