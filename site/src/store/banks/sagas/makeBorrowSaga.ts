import { call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import BankAbi from 'constants/Bank.json';
import { makeBorrow } from 'api/ethereum';
import { selectMain } from 'store/main/selectors';
import { banksMakeBorrow, banksSetState } from '../actionCreators';

export function* makeBorrowSaga({ payload }: ReturnType<typeof banksMakeBorrow>) {
  yield put(banksSetState({ isLoadingSubmit: true }));
  try {
    const { web3 }: ReturnType<typeof selectMain> = yield select(selectMain);

    const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress, web3);
    const bankContract = getContract(payload.bankAddress, BankAbi.abi, web3);
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
