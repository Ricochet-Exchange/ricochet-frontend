import { Coin } from '../../constants/coins';

export type MainState = {
  address: string;
  balances?: { [key:string]: string };
  hasUsdcApprove?: boolean;
  hasDaiApprove?: boolean;
  hasMkrApprove?: boolean;
  hasWethApprove?: boolean;
  hasWbtcApprove?: boolean;
  hasMaticApprove?: boolean;
  hasSushiApprove?: boolean;
  usdcRicFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  usdcSlpFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  usdcWethFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  daiMkrFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  mkrDaiFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  usdcMkrFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  mkrUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  daiMaticFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  maticDaiFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  usdcMaticFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  maticUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  daiEthFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  ethDaiFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  usdcWbtcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  wethUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  },
  wbtcUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number },
  }
  isLoadingDowngrade: boolean,
  isLoadingUpgrade: boolean,
  isLoading: boolean,
  selectedDowngradeCoin: Coin,
  selectedUpgradeCoin: Coin,
  coinType: Coin
};
