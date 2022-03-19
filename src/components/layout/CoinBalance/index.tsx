import React, {
  FC,
} from 'react';
import ButtonNew from 'components/common/ButtonNew';
import { useTranslation } from 'i18n';
import { Coin, iconsCoin } from '../../../constants/coins';
import styles from './styles.module.scss';
import { FontIcon, FontIconName } from 'components/common/FontIcon';

interface IProps {
  nameCoin: Coin,
  balance?: number,
  className: string,
  onClickMax: (() => void) | undefined,
  onSelectToken: (coin: Coin) => void,
}

export const CoinBalance: FC<IProps> = ({
  nameCoin, balance, className, onClickMax, onSelectToken,
}) => {
  const { t } = useTranslation();
  
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
            onClick={() => onSelectToken(nameCoin)}
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
        <div
          onClick={() => onSelectToken(nameCoin)}
          aria-hidden="true"
        >
          <FontIcon name={FontIconName.ArrowDown} className={styles.arrow_down} size={35} />
         </div>
      </div>
    </ButtonNew>
  );
};
