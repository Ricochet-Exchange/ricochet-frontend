import { DistributionsActionTypes } from './actionTypes';
import { DistributionState } from './types';

export const distributionsSetState = (payload: Partial<DistributionState>) => ({
  type: DistributionsActionTypes.SET_STATE,
  payload,
});

export const distributionsGetData = () => ({
  type: DistributionsActionTypes.LOAD_DISTRIBUTIONS_DATA,
});
