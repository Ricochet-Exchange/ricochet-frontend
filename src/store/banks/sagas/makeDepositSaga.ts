import { call, put } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { makeDeposit } from 'api/ethereum';
import BankAbi from 'constants/Bank.json';
import { banksMakeDeposit, banksSetState } from '../actionCreators';

export function* makeDepositSaga({ payload }: ReturnType<typeof banksMakeDeposit>) {
  yield put(banksSetState({ isLoadingSubmit: true }));
  const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress);
  const bankContract = getContract(payload.bankAddress, BankAbi.abi);
  try {
    const { transactionHash } = yield call(
      makeDeposit,
      bankContract,
      accountAddress,
      payload.depositAmount,
    );
    payload.callback(transactionHash);
  } catch (e) {
    payload.callback('', 'Error depositing token');
  } finally {
    yield put(banksSetState({ isLoadingSubmit: false }));
  }
}
