export type MainState = {
  address: string;
  balances?: { [key:string]: string };
  hasUsdcApprove?: boolean;
  hasDaiApprove?: boolean;
  hasMkrApprove?: boolean;
  hasWethApprove?: boolean;
  hasWbtcApprove?: boolean;
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
  isLoadingUsdcDowngrade: boolean,
  isLoadingUsdcUpgrade: boolean,
  isLoadingMkrDowngrade: boolean,
  isLoadingMkrUpgrade: boolean,
  isLoadingDaiDowngrade: boolean,
  isLoadingDaiUpgrade: boolean,
  isLoadingDaiMkrFlow: boolean,
  isLoadingEthDaiFlow: boolean,
  isLoadingDaiEthFlow: boolean,
  isLoadingMkrDaiFlow: boolean,
  isLoadingUsdcWbtcFlow: boolean,
  isLoadingUsdcWethFlow: boolean,
  isLoadingWbtcDowngrade: boolean,
  isLoadingWbtcUpgrade: boolean,
  isLoadingWbtcFlow: boolean,
  isLoadingWethDownGrade: boolean,
  isLoadingWethUpgrade: boolean,
  isLoadingWethFlow: boolean,
};
