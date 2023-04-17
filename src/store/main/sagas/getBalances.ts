import { put, call, select } from 'redux-saga/effects';
import { fromWei } from 'utils/balances';
import { tokenArray, WBTCAddress, USDCAddress, WMATICAddress } from 'constants/polygon_config';
import { makeBatchRequest } from 'utils/makeBatchRequest';
import { mainSetState } from '../actionCreators';
import { selectMain } from '../selectors';

export function* getBalances(address: string) {
	console.log('getBalances', address);
	const contractsAddress = tokenArray;

	const main: ReturnType<typeof selectMain> = yield select(selectMain);
	const { web3 } = main;
	const requests = contractsAddress.map((el) => ({
		target: el,
		call: ['balanceOf(address)(uint256)', address],
		returns: [
			[
				el,
				(result: string) => {
					if (el === WBTCAddress) {
						return fromWei(result, 8);
					}
					if (el === USDCAddress) {
						return fromWei(result, 6);
					}
					return fromWei(result, 18);
				},
			],
		],
	}));

	const results: string[] = yield call(makeBatchRequest, requests, web3);
	const balances: { [key: string]: string } = {};
	Object.entries(results).forEach((entry: [string, string]) => {
		// TODO: Use decimals() method instead of hardcoded
		Object.assign(balances, { [entry[0]]: entry[1] });
	});

	// Edit matic balance
	balances[WMATICAddress] = fromWei(yield web3.eth.getBalance(address), 18);

	yield put(mainSetState({ balances }));
}
