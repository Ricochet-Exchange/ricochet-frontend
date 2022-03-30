import React, { FC, useCallback, useState } from 'react';
import { Routes } from 'constants/routes';
import { UserSettings } from 'components/layout/UserSettings';
import Link from 'components/common/Link';
import { MobileMenu } from 'components/layout/MobileMenu';
import { Hamburger } from 'components/Hamburger';
import { useTranslation } from 'i18n';
import styles from './styles.module.scss';
import logo from '../../../assets/images/logo.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';

interface IProps {
  address: string;
  balance?: string;
}

export const HeaderContainer: FC<IProps> = ({ address, balance }) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const toggleHamburger = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const HeaderText = () => {
    switch (pathname) {
      case Routes.Wallet:
        return (
          <>
            <div>{t('Wallet')}</div>
          </>
        );
      case Routes.Invest:
        return (
          <>
            <div>{t('Invest')}</div>
          </>
        );
      case Routes.Distributions:
        return (
          <>
            <div>{t('Distributions')}</div>
          </>
        );
      case Routes.Banks:
        return (
          <>
            <div>{t('Banks')}</div>
          </>
        );
      case Routes.Vaults:
        return (
          <>
            <div>{t('Vaults')}</div>
          </>
        );
      case Routes.InvestLaunchpads:
        return (
          <>
            <div>{t('Launchpad')}</div>
          </>
        );
      case Routes.RecentActivity:
        return (
          <>
            <div>{t('Activity')}</div>
          </>
        );
      case Routes.Refer:
        return (
          <>
            <div>{t('Refer')}</div>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.header_wrap}>
      <div className={styles.mob_panel}>
        <div className={styles.logo}>
          <Link to={Routes.Invest}>
            <a>
              <Image src={logo} alt="Ricochet" />
            </a>
          </Link>
        </div>

        <div className={styles.links}>
          <Link to={Routes.Invest} activeClassName={styles.active}>
            <a className={styles.dca_link}>
              <div>{t('Invest')}</div>
            </a>
          </Link>
          <Link to={Routes.Wallet} activeClassName={styles.active}>
            <a className={styles.upgrade_link}>
              <div>{t('Wallet')}</div>
            </a>
          </Link>
        </div>

        <div className={styles.settings_wrap}>
          <UserSettings
            className={styles.dot}
            ricBalance={balance}
            account={address}
          />
        </div>
        <div className={styles.mob_head}>
          <HeaderText />
        </div>
        <div className={styles.hamburger_container}>
          <Hamburger open={open} setOpen={setOpen} />
          {open && <MobileMenu closeMenu={toggleHamburger} />}
        </div>
      </div>
    </div>
  );
};
