import { select, put } from 'redux-saga/effects';
import { selectMain } from '../selectors';
import { mainSetState } from '../actionCreators';

export function* aggregatedRICRewards(value: string) {
	const main: ReturnType<typeof selectMain> = yield select(selectMain);

	const aggregatedRewards = '0';

	const {
		twoWayusdcWethFlowQuery,
		twoWayusdcWbtcFlowQuery,
		twoWayIbUsdIbBTCFlowQuery,
		twoWayIbUsdIbEthFlowQuery,
		twoWayUsdcMaticFlowQuery,
		usdcxibAlluoUSDFlowQuery,
		twoWayDaiWethFlowQuery,
	} = main;

	const marketsArray = [
		twoWayusdcWethFlowQuery,
		twoWayusdcWbtcFlowQuery,
		twoWayIbUsdIbBTCFlowQuery,
		twoWayIbUsdIbEthFlowQuery,
		twoWayUsdcMaticFlowQuery,
		usdcxibAlluoUSDFlowQuery,
		twoWayDaiWethFlowQuery,
	];

	console.log('marketsArray', marketsArray);

	let newReward = 0;

	yield put(mainSetState({ aggregatedRICRewards: `${newReward}` }));
}
