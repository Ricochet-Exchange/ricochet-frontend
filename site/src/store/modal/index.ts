import { createReducer } from 'utils/createReducer';
import { ModalState } from './types';
import { modalHandlers } from './handlers';

export const modalInitialState: Readonly<ModalState> = {
  active: false,
  current: undefined,
};

export default createReducer(modalInitialState, modalHandlers);
