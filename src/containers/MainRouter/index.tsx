import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { WalletPage } from 'pages/WalletPage';
import { InvestPage } from 'pages/InvestPage';
import { BanksPage } from 'pages/BanksPage';
import { VaultsPage } from 'pages/VaultPage';
import { ContractPage } from 'pages/ContractPage';
import { ReferPage, ReferralValidationRedirectPage } from 'pages/ReferPage';

interface IProps {}

const MainRouter: FC<IProps> = () => (
  <Switch>
    <Route path={Routes.Wallet} component={WalletPage} exact />
    <Route path={Routes.InvestStreams} component={InvestPage} exact />
    <Route path={Routes.InvestLaunchpads} component={InvestPage} exact />
    <Route path={Routes.InvestLiquidityMarkets} component={InvestPage} exact />
    <Route path={Routes.Invest} component={InvestPage} exact />
    <Route path={Routes.Contracts} component={ContractPage} exact />
    <Route path={Routes.Banks} component={BanksPage} exact />
    <Route path={Routes.Vaults} component={VaultsPage} exact />
    <Route path={Routes.Refer} component={ReferPage} exact />
    <Route path={Routes.Referral} component={ReferralValidationRedirectPage} exact />
    <Redirect to={Routes.Invest} />
  </Switch>
);

export { MainRouter };
