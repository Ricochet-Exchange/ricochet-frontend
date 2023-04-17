import { call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { mainSetState } from '../actionCreators';
import { sweepQueryFlow } from './sweepQueryFlow';

import { getCoingeckoPrices } from '../../../utils/getCoingeckoPrices';

export function* readCoinGeckoPricesSaga() {
	const coingeckoPrices: Unwrap<typeof getCoingeckoPrices> = yield call(getCoingeckoPrices);
	yield put(
		mainSetState({
			coingeckoPrices,
			isLoading: false,
		}),
	);
}
