import { Coin } from 'constants/coins';
import { MainActionTypes } from './actionTypes';
import { MainState } from './types';

export const mainSetState = (payload: Partial<MainState>) => ({
  type: MainActionTypes.SET_STATE,
  payload,
});

export const mainCheck = () => ({
  type: MainActionTypes.MAIN_CHECK,
});

export const mainSwitchNetwork = () => ({
  type: MainActionTypes.MAIN_SWITCH_NETWORK,
});

export const mainGetData = () => ({
  type: MainActionTypes.LOAD_DATA,
});

export const startFlowAction = (payload: string, 
  config: { [key: string]: string },
  callback: (e?: string) => void) => ({
  type: MainActionTypes.START_FLOW,
  payload: { amount: payload, config, callback },
});

export const stopFlowAction = (
  config: { [key:string]: string },
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.STOP_FLOW,
  payload: { callback, config },
});

export const downgradeAction = (
  value: string,
  tokenAddress: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.DOWNGRADE,
  payload: { tokenAddress, value, callback },
});

export const approveAction = ( 
  amount: string,
  tokenAddress: string,
  superTokenAddress: string,
  callback: (e?:string) => void,
  multi: number,
) => ({
  type: MainActionTypes.APPROVE,
  payload: {
    value: amount, tokenAddress, superTokenAddress, multi, callback, 
  },
});

export const upgradeAction = (
  amount: string,
  superTokenAddress: string,
  callback: (e?:string) => void,
  multi: number,
) => ({
  type: MainActionTypes.UPGRADE,
  payload: {
    value: amount, superTokenAddress, callback, multi, 
  },
});

export const selectUpgradeCoin = (selectedUpgradeCoin: Coin) => ({
  type: MainActionTypes.SELECT_UPGRADE_COIN,
  payload: { selectedUpgradeCoin },
});

export const selectDowngradeCoin = (selectedDowngradeCoin: Coin) => ({
  type: MainActionTypes.SELECT_DOWNGRADE_COIN,
  payload: { selectedDowngradeCoin },
});

export const showTokenList = (coinType: Coin) => ({
  type: MainActionTypes.SHOW_TYPE_TOKEN_LIST,
  payload: { coinType },
});

export const mainGetReadOnlyData = () => ({
  type: MainActionTypes.LOAD_READ_ONLY_DATA,
});
