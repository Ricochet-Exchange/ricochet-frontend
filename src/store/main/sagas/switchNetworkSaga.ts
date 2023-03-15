import { switchNetwork } from 'api/ethereum';
import { call, put } from 'redux-saga/effects';
import { modalHide } from 'store/modal/actionCreators';
import { mainCheck } from '../actionCreators';

export function* switchNetworkSaga() {
  try {
    yield call(switchNetwork);
    yield put(modalHide());
  } catch (e) {
    yield put(mainCheck());
  }
} 
