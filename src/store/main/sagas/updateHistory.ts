import { call, select, put } from 'redux-saga/effects';
import { selectMain } from '../selectors';
import { mainSetState } from '../actionCreators';

export function* updateHistory(link: string) {
	console.log('made it to history updater');
	const main: ReturnType<typeof selectMain> = yield select(selectMain);
	const { linkHistory } = main;

	console.log({ linkHistory: [...linkHistory, link] }, 'link', link);

	yield put(mainSetState({ linkHistory: [...linkHistory, link] }));
}
