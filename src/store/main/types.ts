export type MainState = {
  disabled: boolean;
  address: string;
  balances?: { [key:string]: string };
  hasDaiApprove?: boolean;
  hasWethApprove?: boolean;
  daiFlowQuery?: {
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
