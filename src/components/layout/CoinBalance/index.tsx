import React, {
  FC,
} from 'react';
import ButtonNew from 'components/common/ButtonNew';
import { useTranslation } from 'i18n';
import { Coin, iconsCoin } from '../../../constants/coins';
import styles from './styles.module.scss';

interface IProps {
  nameCoin: Coin,
  balance?: number,
  className: string,
  onClickMax: (() => void) | undefined,
}

export const CoinBalance: FC<IProps> = ({
  nameCoin, balance, className, onClickMax,
}) => {
  const { t } = useTranslation('main');
  
  return (
    <ButtonNew
      className={className}
    >
      <div className={styles.container_balance}>
        <div>
          <img
            src={iconsCoin[nameCoin]}
            alt={nameCoin}
            width="40px"
            aria-hidden="true"
          />
        </div>
        <div className={styles.balance_wrap}>
          <div
            className={styles.name_wrap}
            aria-hidden="true"
          >
            <div className={styles.name}>
              {nameCoin}
            </div>
          </div>
          <div className={styles.balance} onClick={onClickMax} aria-hidden="true">
            <div className={styles.balance_name}>
              {t('Balance')}
              :
            </div>
            <div className={styles.balance_value_container}>
              <div className={styles.balance_value}>{balance?.toFixed(2)}</div>
            </div>
          </div>
        </div>
       
      </div>
    </ButtonNew>
  );
};
