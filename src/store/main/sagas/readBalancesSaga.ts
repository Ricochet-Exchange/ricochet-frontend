import { call, put } from 'redux-saga/effects';
import { selectMain } from '../selectors';
import { getBalances } from './getBalances';
import { getAddress } from 'utils/getAddress';
import { select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { mainSetState } from '../actionCreators';

export function* readBalancesSaga(action: any) {
	const main: ReturnType<typeof selectMain> = yield select(selectMain);
	const { web3 } = main;
	const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
	yield put(mainSetState({ address }));
	yield call(getBalances, address);
	yield put(
		mainSetState({
			address,
		}),
	);
}
