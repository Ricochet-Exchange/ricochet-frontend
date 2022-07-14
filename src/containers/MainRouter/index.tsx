import React, { FC } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Routes } from 'constants/routes';
import { WalletPage } from 'pages/WalletPage';
import { InvestPage } from 'pages/InvestPage';
import { PaymentsPage } from 'pages/PaymentsPage';
import { RecentActivityPage } from 'pages/RecentActivityPage';
import { ReferPage, ReferralValidationRedirectPage } from 'pages/ReferPage';

interface IProps {}

const SentryRoute = Sentry.withSentryRouting(Route);

const MainRouter: FC<IProps> = () => {
	const location = useLocation();
	return (
		<Switch>
			<SentryRoute path={Routes.Wallet} component={WalletPage} exact />
			<SentryRoute path={Routes.InvestStreams} component={InvestPage} exact />
			<SentryRoute path={Routes.InvestLaunchpads} component={InvestPage} exact />
			{/* <SentryRoute path={Routes.InvestLiquidityMarkets} component={InvestPage} exact /> */}
			<SentryRoute path={Routes.Invest} component={InvestPage} exact />
			<SentryRoute path={Routes.Refer} component={ReferPage} exact />
			<SentryRoute path={Routes.RecentActivity} component={RecentActivityPage} exact />
			<SentryRoute path={Routes.Referral} component={ReferralValidationRedirectPage} exact />
			<SentryRoute path={Routes.Payments} component={PaymentsPage} exact />
			<Redirect to={{ pathname: Routes.Invest, search: location.search }} />
			{/* Please do not change, it will break Ledger integration query parameter lookup */}
		</Switch>
	);
};

export { MainRouter };
