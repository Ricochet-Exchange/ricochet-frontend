import { takeLeading } from 'redux-saga/effects';
import { BanksActionTypes } from '../actionTypes';
import { getBanksDataSaga } from './getBanksDataSaga';
import { makeDepositSaga } from './makeDepositSaga';
import { makeBorrowSaga } from './makeBorrowSaga';
import { approveTokenSaga } from './approveTokenSaga';
import { makeTransactionSaga } from './makeTransaction';

export default function* banksSaga() {
  yield takeLeading(BanksActionTypes.LOAD_DATA, getBanksDataSaga);
  yield takeLeading(BanksActionTypes.MAKE_DEPOSIT, makeDepositSaga);
  yield takeLeading(BanksActionTypes.MAKE_BORROW, makeBorrowSaga);
  yield takeLeading(BanksActionTypes.APPROVE_TOKEN, approveTokenSaga);
  yield takeLeading(BanksActionTypes.MAKE_TRANSACTION, makeTransactionSaga);
}
