import { call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import BankAbi from 'constants/Bank.json';
import { makeBorrow } from 'api/ethereum';
import { banksMakeBorrow, banksSetState } from '../actionCreators';

export function* makeBorrowSaga({ payload }: ReturnType<typeof banksMakeBorrow>) {
  yield put(banksSetState({ isLoadingSubmit: true }));
  const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress);
  const bankContract = getContract(payload.bankAddress, BankAbi.abi);
  try {
    const { transactionHash } = yield call(
      makeBorrow,
      bankContract,
      accountAddress,
      payload.borrowAmount,
    );
    payload.callback(transactionHash);
  } catch (e) {
    payload.callback('', 'Error borrowing token');
  } finally {
    yield put(banksSetState({ isLoadingSubmit: false }));
  }
}
