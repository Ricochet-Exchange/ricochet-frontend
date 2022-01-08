import { HandlerFn } from 'types/utils/handlerFn';
import { banksSetState } from './actionCreators';
import { BanksActionTypes } from './actionTypes';
import { BanksState } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BanksHandlerFn<F extends (...args: any) => any> = HandlerFn<
BanksState,
ReturnType<F>
>;

const setState: BanksHandlerFn<typeof banksSetState> = (state, { payload }) => ({
  ...state,
  ...payload,
});

export const MAIN_HANDLERS = {
  [BanksActionTypes.SET_STATE]: setState,
};
