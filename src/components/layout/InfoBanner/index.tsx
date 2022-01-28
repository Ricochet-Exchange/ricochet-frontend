import React, {
  FC, useState, useCallback,
} from 'react';
import cx from 'classnames';
import { useTranslation } from 'i18n';
import { Button } from 'components/common/Button';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

export const InfoBanner: FC = () => {
  const [isShowBanner, setIsShowBanner] = useState(true);

  const onClose = useCallback(() => {
    setIsShowBanner(!isShowBanner);
  }, [isShowBanner, setIsShowBanner]);

  const { t } = useTranslation('main');

  return (
    <div className={cx(styles.infoBanner, { [styles.hideInfoBanner]: !isShowBanner })}>
      {t('Ricochet Exchange has partnered with Idle Finance to offer real-time $IDLE investing. Try the $IDLE rexMarket today')}
      <a
        href="https://medium.com/ricochet-exchange/idle-real-time-investing-is-here-7b69e2484032"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        <Button
          className={styles.bunnerButton}
          label="Learn More"
        />
      </a>
      <button className={styles.close} type="button" onClick={onClose}>
        <FontIcon name={FontIconName.Close} className={styles.close_icon} size={14} />
      </button>
    </div>
  );
};
