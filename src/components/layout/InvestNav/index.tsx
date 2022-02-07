import React from 'react';
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
          <div className={styles.nav_text}>
            Streams (
            {userStreams.length}
            )
          </div>
        </NavLink>
      )}

      <Link
        to={Routes.Wallet}
        className={styles.nav_link_desktop_only}
        activeClassName={styles.nav_link_active}
      >
        <img
          src="https://cdn0.iconfinder.com/data/icons/zondicons/20/wallet-512.png"
          alt="wallet icon"
          className={styles.wallet_icon}
        />
        <div className={styles.nav_text}>Wallet</div>
      </Link>

      <NavLink
        className={styles.nav_link}
        exact
        activeClassName={styles.nav_link_active}
        to={Routes.Invest}
      >
        <FontIcon name={FontIconName.Swap} size={16} />
        <div className={styles.nav_text}>Market</div>
      </NavLink>

      <NavLink
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
        to={Routes.InvestLiquidityMarkets}
      >
        <FontIcon name={FontIconName.Loop} size={16} />
        <div className={styles.nav_text}>Streaming</div>
      </NavLink>

      <NavLink
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
        to={Routes.InvestLaunchpads}
      >
        <FontIcon name={FontIconName.Shuttle} size={16} />
        <div className={styles.nav_text}>Launchpad</div>
      </NavLink>

      <NavLink
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
        to={Routes.Banks}
      >
        <FontIcon name={FontIconName.Bank} size={16} />
        <div className={styles.nav_text}>Bank</div>
      </NavLink>

      {(location.pathname === Routes.Banks ||
        location.pathname === Routes.Vaults) && (
        <NavLink
          className={styles.nav_link}
          activeClassName={styles.nav_link_active}
          to={Routes.Vaults}
        >
          <FontIcon name={FontIconName.Lock} size={16} />
          <div className={styles.nav_text}>Vault</div>
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
        className={styles.nav_link}
        to={{ pathname: TUTORIAL_LINK }}
        target="_blank"
      >
        <div className={styles.nav_text_tutorial}>Tutorial</div>
        <FontIcon name={FontIconName.External} size={16} />
      </NavLink>
    </div>
  );
};
