import { createReducer } from 'utils/createReducer';
import { DistributionState } from './types';
import { MAIN_HANDLERS } from './handlers';

export const distributionsInitialState: Readonly<DistributionState> = {
	distributions: [],
	isLoading: true,
};

export default createReducer(distributionsInitialState, MAIN_HANDLERS);
