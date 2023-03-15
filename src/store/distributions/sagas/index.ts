import { takeLeading } from 'redux-saga/effects';
import { DistributionsActionTypes } from '../actionTypes';
import { getDistributionsDataSaga } from './getDistributionsDataSaga';

export default function* distributionsSaga() {
	yield takeLeading(DistributionsActionTypes.LOAD_DISTRIBUTIONS_DATA, getDistributionsDataSaga);
}
