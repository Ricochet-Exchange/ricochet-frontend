const home = process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

export const REFERRAL_URL_PREFIX = 'ref';

export const Routes: any = {
	Invest: `${home}/invest/rex-market`,
	InvestStreams: `${home}/invest/streams`,
	// InvestLiquidityMarkets: `${home}/invest/rex-lp`,
	InvestLaunchpads: `${home}/invest/rex-launchpad`,
	Wallet: `${home}/wallet`,
	Refer: `${home}/refer`,
	Payments: `${home}/payments`,
	Referral: `${home}/(.*)?/${REFERRAL_URL_PREFIX}/:referralId`,
	RecentActivity: `${home}/recent-activity`,
	SuperSwap: `${home}/super-swap`,
};
