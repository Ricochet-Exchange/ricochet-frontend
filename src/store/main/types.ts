export type MainState = {
  disabled: boolean;
  address: string;
  balances?: { [key:string]: string };
  hasUsdcApprove?: boolean;
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
  }
};
