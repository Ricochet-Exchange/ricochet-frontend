import { call, put, select } from 'redux-saga/effects';
import { Unwrap } from 'types/unwrap';
import { transformError } from 'utils/transformError';
import { selectMain } from 'store/main/selectors';
import { distributionsSetState } from '../actionCreators';
import { queryDistributions } from '../../../api';
import { mapFromSubgraphResponse } from '../../../utils/getIndexDetail';

export function* getDistributionsDataSaga() {
  try {
    yield put(distributionsSetState({ isLoading: true }));
    const { web3, address }: ReturnType<typeof selectMain> = yield select(selectMain);

    yield put(distributionsSetState({ isLoading: true }));
    const response: Unwrap<typeof queryDistributions> =
        yield call(queryDistributions, address);
    
    const distributions: Unwrap<typeof mapFromSubgraphResponse> =
        yield call(mapFromSubgraphResponse, web3, response);

    yield put(distributionsSetState({
      distributions: distributions.sort((n1, n2) => n2.updatedAtTimestamp - n1.updatedAtTimestamp),
      isLoading: false,
    }));
  } catch (e) {
    transformError(e);
    yield put(distributionsSetState({ isLoading: false }));
  }
}
