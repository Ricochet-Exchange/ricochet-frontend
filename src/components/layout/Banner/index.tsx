import React, { FC } from 'react';
import { useTranslation } from 'i18n';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

export const Banner: FC = () => {
  const { t } = useTranslation('main');
  return (
    <div className={styles.banner}>
      <FontIcon name={FontIconName.Warning} size={12} />
      {t(
        'Ricochet Exchange smart contracts are unaudited, use at your own risk.',
      )}
    </div>
  );
};
