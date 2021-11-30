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
  apy?: number, 
  rewardsApy?: number, 
  feesApy?: number, 
  usdcRicFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  usdcSlpFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  usdcWethFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  daiMkrFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  mkrDaiFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  usdcMkrFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  mkrUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  daiMaticFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  maticDaiFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  usdcMaticFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  maticUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  daiEthFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  ethDaiFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  usdcWbtcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  wethUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  },
  wbtcUsdcFlowQuery?: {
    flowKey: string, 
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string, 
    subsidyRate: { perso:number, total:number, endDate:string },
  }
  isLoadingDowngrade: boolean,
  isLoadingUpgrade: boolean,
  isLoading: boolean,
  selectedDowngradeCoin: Coin,
  selectedUpgradeCoin: Coin,
  coinType: Coin
};
