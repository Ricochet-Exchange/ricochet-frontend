import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { NavLink } from 'react-router-dom';
import { selectUserStreams } from 'store/main/selectors';
import { Routes } from 'constants/routes';
import { useShallowSelector } from 'hooks/useShallowSelector';
import Link from 'components/common/Link';
import logo from '../../../assets/images/logo.svg';
import styles from './styles.module.scss';

const TUTORIAL_LINK = 'https://docs.ricochet.exchange/tutorial/using-the-dapp';

export const InvestNav = () => {
  const userStreams = useShallowSelector(selectUserStreams);
  return (
    <div className={styles.nav_container}>

      <div className={styles.logo}>
        <Link to={Routes.Invest}><img src={logo} alt="Ricochet" className={styles.logo_img} /></Link>
      </div>

      {userStreams.length > 0 && (
        <NavLink
          className={styles.nav_link}
          exact
          activeClassName={styles.nav_link_active}
          to={Routes.InvestStreams}
        >
          <FontIcon name={FontIconName.RicoUser} size={16} />
          <div className={styles.nav_text}>
            Streams
            <span className={styles.badge}>{userStreams.length}</span>
          </div>
        </NavLink>
      )}

      <Link
        to={Routes.Wallet}
        className={styles.nav_link_desktop_only}
        activeClassName={styles.nav_link_active}
      >
        <FontIcon name={FontIconName.Wallet} size={16} />
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

      {/* <NavLink */}
      {/*  className={styles.nav_link} */}
      {/*  activeClassName={styles.nav_link_active} */}
      {/*  to={Routes.InvestLiquidityMarkets} */}
      {/* > */}
      {/*  <FontIcon name={FontIconName.Loop} size={16} /> */}
      {/*  <div className={styles.nav_text}>LP</div> */}
      {/* </NavLink> */}

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
      <NavLink
        className={styles.nav_link} 
        activeClassName={styles.nav_link_active} 
        to={Routes.Trade}
      >
        <FontIcon name={FontIconName.Loop} size={16} />
  &nbsp;rexTrade
      </NavLink>

      <NavLink
        className={styles.nav_link}
        activeClassName={styles.nav_link_active}
        to={Routes.Vaults}
      >
        <FontIcon name={FontIconName.Lock} size={16} />
        <div className={styles.nav_text}>Vault</div>
      </NavLink>    

      <NavLink
        to={Routes.Refer}
        className={styles.nav_link_desktop_only}
        activeClassName={styles.nav_link_active}
      >
        <FontIcon name={FontIconName.Refer} size={16} />
        <div className={styles.nav_text}>Refer</div>
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
