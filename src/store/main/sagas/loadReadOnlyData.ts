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
    yield put(mainGetReadOnlyData());
  } 
}
