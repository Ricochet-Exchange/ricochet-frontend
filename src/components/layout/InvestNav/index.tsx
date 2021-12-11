import React from 'react';
import { NavLink } from 'react-router-dom';
import { Routes } from 'constants/routes';
import styles from './styles.module.scss';

export const InvestNav = () => (
  <div className={styles.nav_container}>
    <NavLink 
      className={styles.nav_link} 
      exact
      activeClassName={styles.nav_link_active} 
      to={Routes.Invest}
    >
      Markets
    </NavLink>
    <NavLink 
      className={styles.nav_link} 
      activeClassName={styles.nav_link_active} 
      to={Routes.InvestLiquidityMarkets}
    >
      Liquidity Markets
    </NavLink>
    <NavLink 
      className={styles.nav_link} 
      activeClassName={styles.nav_link_active} 
      to={Routes.InvestLaunchpads}
    >
      Launchpads
    </NavLink>
  </div>
);
