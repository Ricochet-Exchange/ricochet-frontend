import { all, call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { mainGetData, mainSetState } from '../actionCreators';
import {
	checkIfApproveDai,
	checkIfApproveMatic,
	checkIfApproveUsdc,
	checkIfApproveWbtc,
	checkIfApproveWeth,
	checkIfApproveIbAlluoUSD,
	checkIfApproveIbAlluoETH,
	checkIfApproveIbAlluoBTC,
} from './checkIfApprove';
import { getBalances } from './getBalances';
import { sweepQueryFlow } from './sweepQueryFlow';
import { selectMain } from '../selectors';
import { getCoingeckoPrices } from '../../../utils/getCoingeckoPrices';

export function* loadData() {
	try {
		const startTime = performance.now();
		yield put(mainSetState({ isLoading: true, isReadOnly: false }));
		const main: ReturnType<typeof selectMain> = yield select(selectMain);
		const { web3 } = main;
		const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
		yield put(mainSetState({ address }));
		const coingeckoPrices: Unwrap<typeof getCoingeckoPrices> = yield call(getCoingeckoPrices);
		yield call(getBalances, address);
		yield all([
			call(checkIfApproveUsdc),
			call(checkIfApproveDai),
			call(checkIfApproveWeth),
			call(checkIfApproveWbtc),
			call(checkIfApproveMatic),
			call(checkIfApproveIbAlluoUSD),
			call(checkIfApproveIbAlluoETH),
			call(checkIfApproveIbAlluoBTC),
			call(sweepQueryFlow),
		]);
		const endTime = performance.now();
		console.log('total time to load app', endTime - startTime);
		yield put(
			mainSetState({
				address,
				coingeckoPrices,
				isLoading: false,
			}),
		);
	} catch (e) {
		yield put(mainGetData());
	}
}
