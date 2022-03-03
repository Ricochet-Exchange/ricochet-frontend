import { fork } from 'redux-saga/effects';
import mainSaga from 'store/main/sagas';
import banksSaga from 'store/banks/sagas';
import distributionsSaga from 'store/distributions/sagas';

export default function* rootSaga() {
  yield fork(mainSaga);
  yield fork(banksSaga);
  yield fork(distributionsSaga);
}
