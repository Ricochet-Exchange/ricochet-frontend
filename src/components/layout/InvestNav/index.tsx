import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { NavLink } from 'react-router-dom';
import { selectUserStreams } from 'store/main/selectors';
import { Routes } from 'constants/routes';
import { useShallowSelector } from 'hooks/useShallowSelector';
import styles from './styles.module.scss';

export const InvestNav = () => {
  const userStreams = useShallowSelector(selectUserStreams);
  return (
    <div className={styles.nav_container}>
      {userStreams.length > 0 && (
      <NavLink 
        className={styles.nav_link} 
        exact
        activeClassName={styles.nav_link_active} 
        to={Routes.InvestStreams}
      >
        <FontIcon name={FontIconName.RicoUser} size={16} />
  &nbsp;streams (
        {userStreams.length}
        )
      </NavLink>
      )}
      <NavLink 
        className={styles.nav_link} 
        exact
        activeClassName={styles.nav_link_active} 
        to={Routes.Invest}
      >
        <FontIcon name={FontIconName.Swap} size={16} />
  &nbsp;rexMarket
      </NavLink>
      <NavLink 
        className={styles.nav_link} 
        activeClassName={styles.nav_link_active} 
        to={Routes.InvestLiquidityMarkets}
      >
        <FontIcon name={FontIconName.Loop} size={16} />
  &nbsp;rexLP
      </NavLink>
      <NavLink 
        className={styles.nav_link} 
        activeClassName={styles.nav_link_active} 
        to={Routes.InvestLaunchpads}
      >
        <FontIcon name={FontIconName.Shuttle} size={16} />
  &nbsp;rexLaunchpad
      </NavLink>
      <a 
        className={styles.link} 
        href="https://bank.ricochet.exchange/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontIcon name={FontIconName.Bank} size={16} />
  &nbsp;rexBank 
        {' '}
        <FontIcon name={FontIconName.External} size={16} />
      </a>
    </div>
  );
};
