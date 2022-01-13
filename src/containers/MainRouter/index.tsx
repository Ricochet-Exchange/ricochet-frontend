import React, { FC } from 'react';
import {
  Route, Switch, Redirect, useLocation, 
} from 'react-router-dom';
import { Routes } from 'constants/routes';
import { WalletPage } from 'pages/WalletPage';
import { InvestPage } from 'pages/InvestPage';
import { BanksPage } from 'pages/BanksPage';
import { VaultsPage } from 'pages/VaultPage';

interface IProps {}

const MainRouter: FC<IProps> = () => {
  const location = useLocation();
  return (
    <Switch>
      <Route path={Routes.Wallet} component={WalletPage} exact />
      <Route path={Routes.InvestStreams} component={InvestPage} exact />
      <Route path={Routes.InvestLaunchpads} component={InvestPage} exact />
      <Route path={Routes.InvestLiquidityMarkets} component={InvestPage} exact />
      <Route path={Routes.Invest} component={InvestPage} exact />
      <Route path={Routes.Banks} component={BanksPage} exact />
      <Route path={Routes.Vaults} component={VaultsPage} exact />
      <Redirect to={{ pathname: Routes.Invest, search: location.search }} />
    </Switch>
  );
};

export { MainRouter };
