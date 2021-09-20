export type MainState = {
  address: string;
  balances?: { [key:string]: string };
  hasUsdcApprove?: boolean;
  hasDaiApprove?: boolean;
  hasWethApprove?: boolean;
  hasWbtcApprove?: boolean;
  usdcWethFlowQuery?: {
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
  isLoadingDaiDowngrade: boolean,
  isLoadingDaiUpgrade: boolean,
  isLoadingUsdcWbtcFlow: boolean,
  isLoadingUsdcWethFlow: boolean,
  isLoadingWbtcDowngrade: boolean,
  isLoadingWbtcUpgrade: boolean,
  isLoadingWbtcFlow: boolean,
  isLoadingWethDownGrade: boolean,
  isLoadingWethUpgrade: boolean,
  isLoadingWethFlow: boolean,
};
