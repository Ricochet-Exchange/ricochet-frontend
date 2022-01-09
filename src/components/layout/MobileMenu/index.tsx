import React, {
  FC,
} from 'react';
import Link from 'components/common/Link';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { useTranslation } from 'i18n';
import { Routes } from '../../../constants/routes';
import styles from './styles.module.scss';
import logo from '../../../assets/images/logo.svg';

interface IProps {
  closeMenu?: () => void,
}

export const MobileMenu: FC<IProps> = ({ closeMenu }) => {
  const { t } = useTranslation('main');
  return (
    <div className={styles.menu_mob}>
      <div className={styles.container}>
        <div className={styles.menu_head}>
          <div className={styles.logo}>
            <Link to={Routes.Invest}><img src={logo} alt="Ricochet" /></Link>
          </div>
          <button className={styles.close} onClick={closeMenu} type="button">
            <FontIcon name={FontIconName.Close} className={styles.close_icon} size={14} />
          </button>
        </div>
        <div className={styles.links}>
          <Link
            to={Routes.Invest}
            className={styles.invest}
            activeClassName={styles.active}
          >
            <div>{t('Invest')}</div>
          </Link>
          <Link
            to={Routes.Wallet}
            className={styles.wallet} 
            activeClassName={styles.active}
          >
            <div>{t('Wallet')}</div>
          </Link>
          <Link
            to={Routes.Banks}
            className={styles.banks}
          >
            <div>{t('Banks')}</div>
          </Link>
        </div>
      </div>
    </div>
  );
};
