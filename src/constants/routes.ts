const home = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

export const REFERRAL_URL_PREFIX = 'ref';

export const Routes: any = {
  Invest: `${home}/invest/rex-market`,
  Distributions: `${home}/distributions`,
  InvestStreams: `${home}/invest/streams`,
  // InvestLiquidityMarkets: `${home}/invest/rex-lp`,
  InvestLaunchpads: `${home}/invest/rex-launchpad`,
  Wallet: `${home}/wallet`,
  Banks: `${home}/banks`,
  Vaults: `${home}/vaults`,
  Refer: `${home}/refer`,
  Referral: `${home}/(.*)?/${REFERRAL_URL_PREFIX}/:referralId`,
  RecentActivity: `${home}/recent-activity`,
  Swap: `${home}/swap`,
};
