import {
  select,
  call,
  put,
  all,
} from 'redux-saga/effects';
import { getBankData } from 'api/ethereum';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { mainSetState } from 'store/main/actionCreators';
import { banksSetState } from '../actionCreators';
import { BankType } from '../types';
import { selectBanksAddresses } from '../selectors';

export function* getBanksDataSaga() {
  yield put(mainSetState({ isLoading: true }));
  const bankAddresses:ReturnType<typeof selectBanksAddresses> =
  yield select(selectBanksAddresses);
  const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress);
  const banks: BankType[] = yield all(bankAddresses.map((bankAddress: string) => (
    call(
      getBankData,
      bankAddress,
      accountAddress,
    )
  )));
  yield put(banksSetState({ banks }));
  yield put(mainSetState({ isLoading: false }));
}
