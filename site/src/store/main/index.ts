import { Coin } from 'constants/coins';
import { createReducer } from 'utils/createReducer';
import Web3 from 'web3';
import { MAIN_HANDLERS } from './handlers';
import { MainState } from './types';

export const mainInitialState: Readonly<MainState> = {
  web3: new Web3(),
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
