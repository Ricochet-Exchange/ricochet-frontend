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

export const usdcDownGrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.USDC_DOWNGRADE,
  payload: { value: payload, callback },
});

export const wethDownGrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.WETH_DOWNGRADE,
  payload: { value: payload, callback },
});

export const wbtcDownGrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.WBTC_DOWNGRADE,
  payload: { value: payload, callback },
});

export const usdcApprove = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.USDC_APPROVE,
  payload: { value: payload, callback },
});

export const usdcUpgrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.USDC_UPGRADE,
  payload: { value: payload, callback },
});

export const wethApprove = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.WETH_APPROVE,
  payload: { value: payload, callback },
});

export const wethUpgrade = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.WETH_UPGRADE,
  payload: { value: payload, callback },
});

export const wbtcApprove = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.WBTC_APPROVE,
  payload: { value: payload, callback },
});

export const wbtcUpgrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.WBTC_UPGRADE,
  payload: { value: payload, callback },
});

export const usdcWethSubscription = () => ({
  type: MainActionTypes.USDC_WETH_SUBSCRIPTION,
});

export const wethUsdcSubscription = () => ({
  type: MainActionTypes.WETH_USDC_SUBSCRIPTION,
});

export const usdcWethStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.USDC_WETH_STOP_FLOW,
  payload: { callback },
});

export const usdcWbtcStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.USDC_WBTC_STOP_FLOW,
  payload: { callback },
});

export const wethUsdcStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.WETH_USDC_STOP_FLOW,
  payload: { callback },
});

export const wbtcUsdcStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.WBTC_USDC_STOP_FLOW,
  payload: { callback },
});

export const usdcWethStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.USDC_WETH_START_FLOW,
  payload: { amount: payload, callback },
});

export const usdcWbtcStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.USDC_WBTC_START_FLOW,
  payload: { amount: payload, callback },
});

export const wethUsdcStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.WETH_USDC_START_FLOW,
  payload: { amount: payload, callback },
});

export const wbtcUsdcStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.WBTC_USDC_START_FLOW,
  payload: { amount: payload, callback },
});

export const subscriptionRicUsdcWbtc = (callback: (e?: string) => void) => ({
  type: MainActionTypes.SUBSCRIPTION_RIC_USDC_WBTC,
  callback,
});

export const subscriptionRicUsdcWeth = (callback: (e?: string) => void) => ({
  type: MainActionTypes.SUBSCRIPTION_RIC_USDC_WETH,
  callback,
});

export const subscriptionRicWbtcUsdc = (callback: (e?: string) => void) => ({
  type: MainActionTypes.SUBSCRIPTION_RIC_WBTC_USDC,
  callback,
});

export const subscriptionRicWethUsdc = (callback: (e?: string) => void) => ({
  type: MainActionTypes.SUBSCRIPTION_RIC_WETH_USDC,
  callback,
});
