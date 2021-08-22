import { MainActionTypes } from './actionTypes';
import { MainState } from './types';

export const mainSetState = (payload: Partial<MainState>) => ({
  type: MainActionTypes.SET_STATE,
  payload,
});

export const mainGetData = () => ({
  type: MainActionTypes.LOAD_DATA,
});

export const mainChainChanged = (payload: string) => ({
  type: MainActionTypes.CHAIN_CHANGED,
  payload,
});

export const daiDownGrade = (
  payload: string,
  callback: () => void,
) => ({
  type: MainActionTypes.DAI_DOWNGRADE,
  payload: { value: payload, callback },
});

export const wethDownGrade = (
  payload: string,
  callback: () => void,
) => ({
  type: MainActionTypes.WETH_DOWNGRADE,
  payload: { value: payload, callback },
});

export const daiApprove = (
  payload: string,
  callback: () => void,
) => ({
  type: MainActionTypes.DAI_APPROVE,
  payload: { value: payload, callback },
});

export const daiUpgrade = (
  payload: string,
  callback: () => void,
) => ({
  type: MainActionTypes.DAI_UPGRADE,
  payload: { value: payload, callback },

});

export const wethApprove = (
  payload: string,
  callback: () => void,
) => ({
  type: MainActionTypes.WETH_APPROVE,
  payload: { value: payload, callback },
});

export const wethUpgrade = (
  payload: string,
  callback: () => void,
) => ({
  type: MainActionTypes.WETH_UPGRADE,
  payload: { value: payload, callback },

});

export const daiWethSubscription = () => ({
  type: MainActionTypes.DAI_WETH_SUBSCRIPTION,
});

export const wethDaiSubscription = () => ({
  type: MainActionTypes.WETH_DAI_SUBSCRIPTION,
});

export const daiWethStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.DAI_WETH_STOP_FLOW,
  payload: { callback },
});

export const wethDaiStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.WETH_DAI_STOP_FLOW,
  payload: { callback },
});

export const daiWethStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.DAI_WETH_START_FLOW,
  payload: { amount: payload, callback },
});

export const wethDaiStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.WETH_DAI_START_FLOW,
  payload: { amount: payload, callback },
});
