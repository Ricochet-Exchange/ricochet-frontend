import React from 'react';
import { UserSettings } from 'components/layout/UserSettings';
import { InvestNav } from 'components/layout/InvestNav';
import { useTranslation } from 'react-i18next';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { RICAddress } from 'constants/polygon_config';
import StreamManager from 'components/streaming/StreamManager';
import styles from './styles.module.scss';
import { StreamContainer } from '../StreamContainer';

interface IProps { }
export const PaymentsContainer: React.FC<IProps> = () => {
  const { t } = useTranslation();
  const state = useShallowSelector(selectMain);
  const { address, balances } = state;

  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.settings_mob}>
        <UserSettings
          className={styles.dot}
          ricBalance={balances && balances[RICAddress]}
          account={address || t('Connect Wallet')}
        />
      </div>
      <div className={styles.payment_page}>
        <StreamContainer />
        <StreamManager />
      </div>
    </div>
  );
};
