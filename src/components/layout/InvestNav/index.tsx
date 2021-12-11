import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
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
        <FontIcon name={FontIconName.Swap} size={16} />&nbsp;Markets
    </NavLink>
    <NavLink 
      className={styles.nav_link} 
      activeClassName={styles.nav_link_active} 
      to={Routes.InvestLiquidityMarkets}
    >
      <FontIcon name={FontIconName.Loop} size={16} />&nbsp;Liquidity Markets
    </NavLink>
    <NavLink 
      className={styles.nav_link} 
      activeClassName={styles.nav_link_active} 
      to={Routes.InvestLaunchpads}
    >
      <FontIcon name={FontIconName.Shuttle} size={16} />&nbsp;Launchpads
    </NavLink>
  </div>
);
