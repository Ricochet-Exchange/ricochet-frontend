import { ModalActionTypes } from './actionsTypes';
import { ModalState, ModalType } from './types';

export const modalSetState = (payload: Partial<ModalState>) => ({
  type: ModalActionTypes.SetState,
  payload,
});

export const modalShow = (current: ModalType) => ({
  type: ModalActionTypes.Show,
  payload: { current },
});

export const modalHide = () => ({
  type: ModalActionTypes.Hide,
});
