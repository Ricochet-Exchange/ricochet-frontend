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
		console.log('loadData');
		yield put(mainSetState({ isLoading: true, isReadOnly: false }));
		const main: ReturnType<typeof selectMain> = yield select(selectMain);
		console.log('main: ', main);
		const { web3 } = main;
		const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
		console.log('address: ', address);
		yield put(mainSetState({ address }));
		const coingeckoPrices: Unwrap<typeof getCoingeckoPrices> = yield call(getCoingeckoPrices);
		console.log('coingeckoPrices: ', coingeckoPrices);
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
		yield put(
			mainSetState({
				address,
				coingeckoPrices,
				isLoading: false,
			}),
		);
	} catch (e) {
		console.log('Error in loadData: ', e);
		yield put(mainGetData());
	}
}
