export type MainState = {
  disabled: boolean;
  address: string;
  balances?: { [key:string]: string };
  hasUsdcApprove?: boolean;
  hasWethApprove?: boolean;
  hasWbtcApprove?: boolean;
  usdcFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  },
  wethFlowQuery?: {
    flowsReceived: number,
    flowsOwned: string,
    totalFlows: number,
    placeholder: string,
  }
};
