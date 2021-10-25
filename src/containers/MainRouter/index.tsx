import React, { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes } from 'constants/routes';
import { WalletPage } from 'pages/WalletPage';
import { InvestPage } from 'pages/InvestPage';

interface IProps {}

const MainRouter: FC<IProps> = () => (
  <Switch>
    <Route path={Routes.Wallet} component={WalletPage} exact />
    <Route path={Routes.Invest} component={InvestPage} exact />
    <Redirect to={Routes.Invest} />
  </Switch>
);

export { MainRouter };
