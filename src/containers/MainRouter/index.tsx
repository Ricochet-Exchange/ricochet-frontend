import React, { FC } from 'react';
import {
  Redirect, Route, Switch, useLocation, 
} from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { Routes } from 'constants/routes';
import { WalletPage } from 'pages/WalletPage';
import { InvestPage } from 'pages/InvestPage';
import { BanksPage } from 'pages/BanksPage';
import { VaultsPage } from 'pages/VaultPage';
import { ReferPage, ReferralValidationRedirectPage } from 'pages/ReferPage';
import { DistributionPage } from 'pages/Distributions';

interface IProps {
}

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
      <SentryRoute path={Routes.Distributions} component={DistributionPage} exact />
      <SentryRoute path={Routes.Banks} component={BanksPage} exact />
      <SentryRoute path={Routes.Vaults} component={VaultsPage} exact />
      <SentryRoute path={Routes.Refer} component={ReferPage} exact />
      <SentryRoute path={Routes.Referral} component={ReferralValidationRedirectPage} exact />
      <Redirect to={{ pathname: Routes.Invest, search: location.search }} />
      {/* Please do not change, it will break Ledger integration query parameter lookup */}
    </Switch>
  );
};

export { MainRouter };
