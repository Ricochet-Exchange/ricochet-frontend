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

export const daiDownGrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.DAI_DOWNGRADE,
  payload: { value: payload, callback },
});

export const mkrDownGrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.MKR_DOWNGRADE,
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

export const daiUpgrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.DAI_UPGRADE,
  payload: { value: payload, callback },
});

export const daiApprove = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.DAI_APPROVE,
  payload: { value: payload, callback },
});

export const mkrUpgrade = (
  payload: string,
  callback: (e?:string) => void,
) => ({
  type: MainActionTypes.MKR_UPGRADE,
  payload: { value: payload, callback },
});

export const mkrApprove = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.MKR_APPROVE,
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

export const daiEthStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.DAI_ETH_STOP_FLOW,
  payload: { callback },
});

export const ethDaiStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.ETH_DAI_STOP_FLOW,
  payload: { callback },
});

export const daiMkrStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.DAI_MKR_STOP_FLOW,
  payload: { callback },
});

export const mkrDaiStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.MKR_DAI_STOP_FLOW,
  payload: { callback },
});

export const usdcMkrStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.USDC_MKR_STOP_FLOW,
  payload: { callback },
});

export const maticUsdcStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.MKR_USDC_STOP_FLOW,
  payload: { callback },
});

export const daiMaticStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.DAI_MATIC_STOP_FLOW,
  payload: { callback },
});

export const maticDaiStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.MATIC_DAI_STOP_FLOW,
  payload: { callback },
});

export const usdcMaticStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.USDC_MATIC_STOP_FLOW,
  payload: { callback },
});

export const mkrUsdcStopFlow = (callback: (e?: string) => void) => ({
  type: MainActionTypes.MATIC_USDC_STOP_FLOW,
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

export const daiEthStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.DAI_ETH_START_FLOW,
  payload: { amount: payload, callback },
});

export const ethDaiStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.ETH_DAI_START_FLOW,
  payload: { amount: payload, callback },
});

export const daiMkrStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.DAI_MKR_START_FLOW,
  payload: { amount: payload, callback },
});

export const mkrDaiStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.MKR_DAI_START_FLOW,
  payload: { amount: payload, callback },
});

export const usdcMkrStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.USDC_MKR_START_FLOW,
  payload: { amount: payload, callback },
});

export const mkrUsdcStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.MKR_USDC_START_FLOW,
  payload: { amount: payload, callback },
});

export const daiMaticStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.DAI_MATIC_START_FLOW,
  payload: { amount: payload, callback },
});

export const maticDaiStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.MATIC_DAI_START_FLOW,
  payload: { amount: payload, callback },
});

export const usdcMaticStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.USDC_MATIC_START_FLOW,
  payload: { amount: payload, callback },
});

export const maticUsdcStartFlow = (
  payload: string,
  callback: (e?: string) => void,
) => ({
  type: MainActionTypes.MATIC_USDC_START_FLOW,
  payload: { amount: payload, callback },
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
