import React, { FC } from 'react';
import Link from 'components/common/Link';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'i18n';
import { Routes } from '../../../constants/routes';
import styles from './styles.module.scss';

interface IProps {
  closeMenu?: () => void,
}
const RICOCHET_V1_LINK = 'https://v1.ricochet.exchange/';

export const MobileMenu: FC<IProps> = ({ closeMenu }) => {
  const { t } = useTranslation();
  return (
    <nav className={styles.styled_menu} style={closeMenu ? { transform: 'translateX(0)' } : { transform: 'translateX(100%)' }}>
      <div className={styles.mobile_links}>
        <div className={styles.mobile_container}>
          <div className={styles.mobile_styled_link}>
            <div className={styles.anchor_container}>
              <Link
                to={Routes.Invest}
              >
                <div>{t('Invest')}</div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.mobile_container}>
          <div className={styles.mobile_styled_link}>
            <div className={styles.anchor_container}>
              <Link
                to={Routes.Refer}
              >
                <div>{t('Refer')}</div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.mobile_container}>
          <div className={styles.mobile_styled_link}>
            <div className={styles.anchor_container}>
              <Link
                to={Routes.Wallet}
              >
                <div>{t('Wallet')}</div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.mobile_container}>
          <div className={styles.mobile_styled_link}>
            <div className={styles.anchor_container}>
              <Link
                to={Routes.Banks}
              >
                <div>{t('Banks')}</div>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.mobile_container}>
          <div className={styles.mobile_styled_link}>
            <div className={styles.anchor_container}>
              <NavLink
                to={{ pathname: RICOCHET_V1_LINK }}
              >
                <div>{t('Ricochet V1')}</div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
