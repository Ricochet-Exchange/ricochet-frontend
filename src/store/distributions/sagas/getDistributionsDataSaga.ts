import { call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { selectMain } from 'store/main/selectors';
import { distributionsGetData, distributionsSetState } from '../actionCreators';
import { queryDistributions } from '../../../api';
import { mapFromSubgraphResponse } from '../../../utils/getIndexDetail';
import { getSFFramework } from '../../../utils/fluidSDKinstance';
import { selectDistributions } from '../selectors';

export function* getDistributionsDataSaga(): any {
	try {
		yield put(distributionsSetState({ isLoading: true }));
		const { readWeb3, address }: ReturnType<typeof selectMain> = yield select(selectMain);

		yield put(distributionsSetState({ isLoading: true }));
		const response: Unwrap<typeof queryDistributions> = yield call(queryDistributions, address);
		let { framework }: ReturnType<typeof selectDistributions> = yield select(selectDistributions);

		if (!framework) {
			const superFluid: Unwrap<typeof getSFFramework> = yield call(getSFFramework, readWeb3);
			yield put(distributionsSetState({ framework: superFluid }));
			framework = superFluid;
		}
		const distributions: Unwrap<typeof mapFromSubgraphResponse> = yield call(
			mapFromSubgraphResponse,
			framework,
			response,
		);

		yield put(
			distributionsSetState({
				distributions: distributions.sort((n1, n2) => n2.updatedAtTimestamp - n1.updatedAtTimestamp),
				isLoading: false,
			}),
		);
	} catch (e) {
		yield put(distributionsGetData());
	}
}
