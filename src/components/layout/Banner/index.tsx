import React, {
  FC,
} from 'react';
import { useTranslation } from 'i18n';
import styles from './styles.module.scss';

export const Banner: FC = () => {
  const { t } = useTranslation('main'); 
  return (
    <div className={styles.banner}> 
      {t('While reviewed by the Superfluid team, these contracts have not been audited yet, use at your own risk.')}
    </div>
  );
};
