import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { WalletPage } from 'pages/WalletPage';
import { MainPage } from 'pages/MainPage';
import { InvestPage } from 'pages/InvestPage';

interface IProps {}

const MainRouter: FC<IProps> = () => (
  <Switch>
    <Route path={Routes.Wallet} component={WalletPage} exact />
    <Route path={Routes.Invest} component={InvestPage} exact />
    <Route path={Routes.MainOld} component={MainPage} exact />
  </Switch>
);

export { MainRouter };
