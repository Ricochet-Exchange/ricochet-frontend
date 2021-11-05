import { Coin } from '../../constants/coins';

export type MainState = {
  address: string;
  balances?: { [key:string]: string };
  hasUsdcApprove?: boolean;
  hasDaiApprove?: boolean;
  hasMkrApprove?: boolean;
  hasWethApprove?: boolean;
  hasWbtcApprove?: boolean;
  hasWMaticApprove?: boolean;
  hasSushiApprove?: boolean;
  usdcRicFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  usdcSlpFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  usdcWethFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  daiMkrFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  mkrDaiFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  usdcMkrFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  mkrUsdcFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  daiMaticFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  maticDaiFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  usdcMaticFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  maticUsdcFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  daiEthFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  ethDaiFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  usdcWbtcFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  wethUsdcFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  wbtcUsdcFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  }
  isLoadingDowngrade: boolean,
  isLoadingUpgrade: boolean,
  isLoading: boolean,
  selectedDowngradeCoin: Coin,
  selectedUpgradeCoin: Coin,
  coinType: Coin
};
