import { select, call, put } from 'redux-saga/effects';
import { getBankData } from 'api/ethereum';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { mainSetState } from 'store/main/actionCreators';
import { banksGetData, banksSetState } from '../actionCreators';
import { BankType } from '../types';
import { selectBanksAddresses } from '../selectors';

export function* getBanksDataSaga() {
  try {
    yield put(mainSetState({ isLoading: true }));
    const bankAddresses:ReturnType<typeof selectBanksAddresses> =
    yield select(selectBanksAddresses);
    const accountAddress: Unwrap<typeof getAddress> = yield call(getAddress);
    const banks: BankType[] = yield call(
      getBankData,
      bankAddresses[0],
      accountAddress,
    );
    yield put(banksSetState({ banks }));
    yield put(mainSetState({ isLoading: false }));
  } catch (e) {
    yield put(banksGetData());
  }
}
