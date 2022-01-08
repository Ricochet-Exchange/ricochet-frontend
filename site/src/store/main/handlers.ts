import { HandlerFn } from 'types/utils/handlerFn';
import { mainSetState } from './actionCreators';
import { MainActionTypes } from './actionTypes';
import { MainState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MainHandlerFn<F extends (...args: any) => any> = HandlerFn<
MainState,
ReturnType<F>
>;

const setState: MainHandlerFn<typeof mainSetState> = (state, { payload }) => ({
  ...state,
  ...payload,
});

export const MAIN_HANDLERS = {
  [MainActionTypes.SET_STATE]: setState,
};
