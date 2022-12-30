import { select, put } from 'redux-saga/effects';
import { selectMain } from '../selectors';
import { mainSetState } from '../actionCreators';

export function* aggregatedRICRewards(value: string) {
	const main: ReturnType<typeof selectMain> = yield select(selectMain);

	let totalRewards: any = main.aggregatedRICRewards;
	let RICreward = value;
	let newReward: number = 0;
	if (!totalRewards) {
		console.log('error getting awards');
		return;
	}
	//@ts-ignore
	newReward = Number(totalRewards) + Number(RICreward.payload.value);

	yield put(mainSetState({ aggregatedRICRewards: `${newReward}` }));
}
