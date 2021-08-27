import { MainState } from 'store/main/types';
import { ModalState } from 'store/modal/types';

export interface State {
  main: MainState,
  modal: ModalState,
}
