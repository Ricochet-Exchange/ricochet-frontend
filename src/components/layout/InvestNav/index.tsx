import React from 'react';
import cx from 'classnames';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { NavLink, useLocation } from 'react-router-dom';
import { selectUserStreams } from 'store/main/selectors';
import { Routes } from 'constants/routes';
import { useShallowSelector } from 'hooks/useShallowSelector';
import Link from 'components/common/Link';

import styles from './styles.module.scss';

const TUTORIAL_LINK = 'https://docs.ricochet.exchange/tutorial/using-the-dapp';

export const InvestNav = () => {
  const userStreams = useShallowSelector(selectUserStreams);
  const location = useLocation();
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
  &nbsp;Streams (
        {userStreams.length}
        )
      </NavLink>
      )}

      <Link 
        to={Routes.Wallet} 
        className={styles.nav_link_desktop_only} 
        activeClassName={styles.nav_link_active}
      >
        <div>Wallet</div>
      </Link>
     
      <NavLink 
        className={styles.nav_link} 
        exact  
        activeClassName={styles.nav_link_active} 
        to={Routes.Invest}
      >
        <FontIcon name={FontIconName.Swap} size={16} />
          &nbsp;Market
      </NavLink>

      <NavLink 
        className={styles.nav_link} 
        activeClassName={styles.nav_link_active} 
        to={Routes.InvestLiquidityMarkets}
      >
        <FontIcon name={FontIconName.Loop} size={16} />
  &nbsp;Streaming
      </NavLink>

      <NavLink 
        className={styles.nav_link} 
        activeClassName={styles.nav_link_active} 
        to={Routes.InvestLaunchpads}
      >
        <FontIcon name={FontIconName.Shuttle} size={16} />
  &nbsp;Launchpad
      </NavLink>
      
      <NavLink
        className={styles.nav_link} 
        activeClassName={styles.nav_link_active} 
        to={Routes.Banks}
      >
        <FontIcon name={FontIconName.Bank} size={16} />
  &nbsp;Bank
      </NavLink>

      {(location.pathname === Routes.Banks || location.pathname === Routes.Vaults) && (
      <NavLink
        className={cx(styles.nav_link)}
        activeClassName={styles.nav_link_active}
        to={Routes.Vaults}
      >
        <FontIcon name={FontIconName.Lock} size={16} />
        &nbsp;Vault
      </NavLink>
      )}

      <NavLink 
        to={Routes.Refer} 
        className={styles.nav_link_desktop_only} 
        activeClassName={styles.nav_link_active}
      >
        <div>Refer</div>
      </NavLink>
      
      <NavLink
        className={styles.link}
        to={{ pathname: TUTORIAL_LINK }}
        target="_blank"
      >
        Tutorial&nbsp;
        <FontIcon name={FontIconName.External} size={16} />
      </NavLink>
       
    </div>
  );
};
