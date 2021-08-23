import { createReducer } from 'utils/createReducer';
import { MAIN_HANDLERS } from './handlers';
import { MainState } from './types';

export const mainInitialState: Readonly<MainState> = {
  disabled: false,
  address: '',
};

export default createReducer(mainInitialState, MAIN_HANDLERS);
