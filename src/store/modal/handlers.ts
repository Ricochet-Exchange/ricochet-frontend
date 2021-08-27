import { Action as ActionRedux } from 'redux';
import { ModalActionTypes } from './actionsTypes';
import { modalHide, modalSetState, modalShow } from './actionCreators';
import { ModalState } from './types';

export type ActionFn<T, U> = (
  state: Readonly<T>,
  action: ActionRedux<string> & U
) => Readonly<T>;

type ModalHandlerFn<F extends (...args: any[]) => any> = ActionFn<ModalState, ReturnType<F>>;

const setState: ModalHandlerFn<typeof modalSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const show: ModalHandlerFn<typeof modalShow> = (
  state,
  { payload },
) => ({
  ...state,
  active: true,
  current: payload.current,
});

const hide: ModalHandlerFn<typeof modalHide> = (
  state,
) => ({
  ...state,
  active: false,
  current: undefined,
});

export const modalHandlers = {
  [ModalActionTypes.SetState]: setState,
  [ModalActionTypes.Show]: show,
  [ModalActionTypes.Hide]: hide,
};
