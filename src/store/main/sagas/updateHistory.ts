import { select, put } from 'redux-saga/effects';
import { selectMain } from '../selectors';
import { mainSetState } from '../actionCreators';

export function* updateHistory(link: string) {
	const main: ReturnType<typeof selectMain> = yield select(selectMain);
	const { linkHistory } = main;
	yield put(mainSetState({ linkHistory: [...linkHistory, link] }));
}
