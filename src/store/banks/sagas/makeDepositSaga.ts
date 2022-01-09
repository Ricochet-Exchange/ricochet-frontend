import { call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { getContract } from 'utils/getContract';
import { makeDeposit } from 'api/ethereum';
import BankAbi from 'constants/Bank.json';
import { selectMain } from 'store/main/selectors';
import { banksMakeDeposit, banksSetState } from '../actionCreators';

export function* makeDepositSaga({ payload }: ReturnType<typeof banksMakeDeposit>) {
  try {
    yield put(banksSetState({ isLoadingSubmit: true }));
    const { web3 }: ReturnType<typeof selectMain> = yield select(selectMain);
    const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress, web3);
    const bankContract = getContract(payload.bankAddress, BankAbi.abi, web3);
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
