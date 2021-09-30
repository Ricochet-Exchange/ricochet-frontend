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
  isLoadingUsdcDowngrade: boolean,
  isLoadingUsdcUpgrade: boolean,
  isLoadingMkrDowngrade: boolean,
  isLoadingMkrUpgrade: boolean,
  isLoadingDaiDowngrade: boolean,
  isLoadingDaiUpgrade: boolean,
  isLoadingUsdcMkrFlow: boolean,
  isLoadingMkrUsdcFlow: boolean,
  isLoadingDaiMkrFlow: boolean,
  isLoadingMkrDaiFlow: boolean,
  isLoadingUsdcMaticFlow: boolean,
  isLoadingMaticUsdcFlow: boolean,
  isLoadingDaiMaticFlow: boolean,
  isLoadingMaticDaiFlow: boolean,
  isLoadingEthDaiFlow: boolean,
  isLoadingDaiEthFlow: boolean,
  isLoadingUsdcWbtcFlow: boolean,
  isLoadingUsdcWethFlow: boolean,
  isLoadingWbtcDowngrade: boolean,
  isLoadingWbtcUpgrade: boolean,
  isLoadingWbtcFlow: boolean,
  isLoadingWethDownGrade: boolean,
  isLoadingWethUpgrade: boolean,
  isLoadingWethFlow: boolean,
};
