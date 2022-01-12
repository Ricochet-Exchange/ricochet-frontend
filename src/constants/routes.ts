const home = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "";
export const Routes: any = {
  Invest: "${home}/invest/rex-market",
  InvestStreams: "${home}/invest/streams",
  InvestLiquidityMarkets: "${home}/invest/rex-lp",
  InvestLaunchpads: "${home}/invest/rex-launchpad",
  Wallet: "${home}/wallet",
  Banks: "${home}/banks",
  Vaults: "${home}/vaults",
};
