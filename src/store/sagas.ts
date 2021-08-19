import { fork } from 'redux-saga/effects';
import mainSaga from 'store/main/sagas';

export default function* rootSaga() {
  yield fork(mainSaga);
}
