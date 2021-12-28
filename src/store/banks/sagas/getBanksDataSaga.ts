import {
  select,
  call,
  put,
  all,
} from 'redux-saga/effects';
import { getBankData } from 'api/ethereum';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { transformError } from 'utils/transformError';
import { selectMain } from 'store/main/selectors';
import { banksSetState } from '../actionCreators';
import { BankType } from '../types';
import { selectBanksAddresses } from '../selectors';

export function* getBanksDataSaga() {
  try {
    yield put(banksSetState({ isLoading: true }));
    const bankAddresses:ReturnType<typeof selectBanksAddresses> =
      yield select(selectBanksAddresses);

    const { web3 }: ReturnType<typeof selectMain> = yield select(selectMain);

    const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress, web3);
    const banks: BankType[] = yield all(bankAddresses.map((bankAddress: string) => (
      call(
        getBankData,
        bankAddress,
        accountAddress,
        web3,
      )
    )));
    yield put(banksSetState({ banks, isLoading: false }));
  } catch (e) {
    transformError(e);
    yield put(banksSetState({ isLoading: false }));
  }
}
