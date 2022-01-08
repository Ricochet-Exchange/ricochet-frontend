import { fork } from 'redux-saga/effects';
import mainSaga from 'store/main/sagas';
import banksSaga from 'store/banks/sagas';

export default function* rootSaga() {
  yield fork(mainSaga);
  yield fork(banksSaga);
}
