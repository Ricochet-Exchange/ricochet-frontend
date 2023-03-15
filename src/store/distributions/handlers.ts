import { HandlerFn } from 'types/utils/handlerFn';
import { distributionsSetState } from './actionCreators';
import { DistributionsActionTypes } from './actionTypes';
import { DistributionState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DistributionsHandlerFn<F extends (...args: any) => any> = HandlerFn<DistributionState, ReturnType<F>>;

const setState: DistributionsHandlerFn<typeof distributionsSetState> = (state, { payload }) => ({
	...state,
	...payload,
});

export const MAIN_HANDLERS = {
	[DistributionsActionTypes.SET_STATE]: setState,
};
