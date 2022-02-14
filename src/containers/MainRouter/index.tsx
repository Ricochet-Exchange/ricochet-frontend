import React, { FC } from 'react';
import * as Sentry from '@sentry/react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { WalletPage } from 'pages/WalletPage';
import { InvestPage } from 'pages/InvestPage';
import { BanksPage } from 'pages/BanksPage';
import { VaultsPage } from 'pages/VaultPage';
import { ReferPage, ReferralValidationRedirectPage } from 'pages/ReferPage';

const SentryRoute = Sentry.withSentryRouting(Route);

interface IProps {}

const MainRouter: FC<IProps> = () => (
  <Switch>
    <SentryRoute path={Routes.Wallet} component={WalletPage} exact />
    <SentryRoute path={Routes.InvestStreams} component={InvestPage} exact />
    <SentryRoute path={Routes.InvestLaunchpads} component={InvestPage} exact />
    {/* <SentryRoute path={Routes.InvestLiquidityMarkets} component={InvestPage} exact /> */}
    <SentryRoute path={Routes.Invest} component={InvestPage} exact />
    <SentryRoute path={Routes.Banks} component={BanksPage} exact />
    <SentryRoute path={Routes.Vaults} component={VaultsPage} exact />
    <SentryRoute path={Routes.Refer} component={ReferPage} exact />
    <SentryRoute path={Routes.Referral} component={ReferralValidationRedirectPage} exact />
    <Redirect to={Routes.Invest} />
  </Switch>
);

export { MainRouter };
