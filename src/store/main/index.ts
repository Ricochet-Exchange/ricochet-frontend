import { Coin } from 'constants/coins';
import { createReducer } from 'utils/createReducer';
import { MAIN_HANDLERS } from './handlers';
import { MainState } from './types';

export const mainInitialState: Readonly<MainState> = {
  address: '',
  selectedDowngradeCoin: Coin.DAIx, 
  selectedUpgradeCoin: Coin.DAI,
  coinType: Coin.DAI,
  isLoadingDowngrade: false,
  isLoadingUpgrade: false,
  isLoading: true,
  isReadOnly: false,
};

export default createReducer(mainInitialState, MAIN_HANDLERS);
