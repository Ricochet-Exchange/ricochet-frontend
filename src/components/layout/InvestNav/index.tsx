import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { NavLink } from 'components/common/NavLink';
import { selectUserStreams } from 'store/main/selectors';
import { Routes } from 'constants/routes';
import { useShallowSelector } from 'hooks/useShallowSelector';
import Link from 'components/common/Link';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';
import logo from 'assets/images/logo.svg';
import styles from './styles.module.scss';
import Image from 'next/image';

const TUTORIAL_LINK = 'https://docs.ricochet.exchange/tutorial/using-the-dapp';
const RICOCHET_V1_LINK = 'https://v1.ricochet.exchange/';

export const InvestNav = () => {
  const userStreams = useShallowSelector(selectUserStreams);
  const { t } = useTranslation();
  return (
    <div className={styles.nav_container}>
      <div className={styles.logo}>
        <Link to={Routes.Invest}>
          <a>
            <Image src={logo} alt="Ricochet" className={styles.logo_img} />
          </a>
        </Link>
      </div>

      {userStreams.length > 0 && (
        <NavLink
          exact
          activeClassName={styles.nav_link_active}
          href={Routes.InvestStreams}
        >
          <a className={cx(styles.link, styles.nav_link)}>
            <FontIcon name={FontIconName.RicoUser} size={16} />
            <div className={styles.nav_text}>
              {t('Streams')}
              <span className={styles.badge}>{userStreams.length}</span>
            </div>
          </a>
        </NavLink>
      )}

      <Link to={Routes.Wallet} activeClassName={styles.nav_link_active}>
        <a className={cx(styles.link, styles.nav_link_desktop_only)}>
          <FontIcon name={FontIconName.Wallet} size={16} />
          <div className={styles.nav_text}>{t('Wallet')}</div>
        </a>
      </Link>

      <NavLink
        exact
        activeClassName={styles.nav_link_active}
        href={Routes.Invest}
      >
        <a className={cx(styles.link, styles.nav_link)}>
          <FontIcon name={FontIconName.Swap} size={16} />
          <div className={styles.nav_text}>{t('Market')}</div>
        </a>
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
        activeClassName={styles.nav_link_active}
        href={Routes.InvestLaunchpads}
      >
        <a className={cx(styles.link, styles.nav_link)}>
          <FontIcon name={FontIconName.Shuttle} size={16} />
          <div className={styles.nav_text}>{t('Launchpad')}</div>
        </a>
      </NavLink>

      <NavLink
        activeClassName={styles.nav_link_active}
        href={Routes.Distributions}
      >
        <a className={cx(styles.link, styles.nav_link)}>
          <FontIcon name={FontIconName.Distribution} size={16} />
          <div className={styles.nav_text}>{t('Distributions')}</div>
        </a>
      </NavLink>

      <NavLink
        exact
        href={Routes.RecentActivity}
        activeClassName={styles.nav_link_active}
      >
        <a className={cx(styles.link, styles.nav_link)}>
          <FontIcon name={FontIconName.Activity} size={16} />
          <div className={styles.nav_text}>{t('Activity')}</div>
        </a>
      </NavLink>

      <NavLink activeClassName={styles.nav_link_active} href={Routes.Banks}>
        <a className={cx(styles.link, styles.nav_link)}>
          <FontIcon name={FontIconName.Bank} size={16} />
          <div className={styles.nav_text}>{t('Banks')}</div>
        </a>
      </NavLink>

      <NavLink activeClassName={styles.nav_link_active} href={Routes.Vaults}>
        <a className={cx(styles.link, styles.nav_link)}>
          <FontIcon name={FontIconName.Lock} size={16} />
          <div className={styles.nav_text}>{t('Vault')}</div>
        </a>
      </NavLink>

      <NavLink href={Routes.Refer} activeClassName={styles.nav_link_active}>
        <a className={cx(styles.link, styles.nav_link_desktop_only)}>
          <FontIcon name={FontIconName.Refer} size={16} />
          <div className={styles.nav_text}>{t('Refer')}</div>
        </a>
      </NavLink>

      <NavLink href={{ pathname: TUTORIAL_LINK }}>
        <a className={cx(styles.link, styles.nav_link)} target="_blank">
          <div className={styles.nav_text_tutorial}>{t('Tutorial')}</div>
          <FontIcon name={FontIconName.External} size={16} />
        </a>
      </NavLink>

      <NavLink
        href={{ pathname: RICOCHET_V1_LINK }}
        activeClassName={styles.nav_link_active}
      >
        <a
          className={cx(styles.link, styles.nav_link_desktop_only)}
          target="_blank"
        >
          <div className={styles.nav_text_tutorial}>{t('Ricochet V1')}</div>
          <FontIcon name={FontIconName.External} size={16} />
        </a>
      </NavLink>
    </div>
  );
};
