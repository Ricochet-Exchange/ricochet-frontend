import React from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const LoadingPopUp = () => {
  const { t } = useTranslation('main');

  return (
    <div className={styles.loading_wrap}>
      <FontIcon
        className={styles.bankIcon}
        name={FontIconName.Bank}
        size={26}
      />
  
      <h2 className={styles.header}>
        {t('Please hold on while we load your information.')}
      </h2>
  
      <div className={styles.progress}>
        <div className={styles.color} />
      </div>
  
      <h4 className={styles.header_second}>
        {t('This will only take a few moments')}
      </h4>
    </div>
  );
};
