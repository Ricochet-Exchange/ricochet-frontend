import { switchNetwork } from 'api/ethereum';
import { call, put } from 'redux-saga/effects';
import { mainCheck } from '../actionCreators';

export function* switchNetworkSaga() {
  try {
    yield call(switchNetwork);
  } catch (e) {
    yield put(mainCheck());
  }
} 
