import React, {
  FC,
} from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import ButtonNew from 'components/common/ButtonNew';
import { useTranslation } from 'i18n';
import { Coin, iconsCoin } from '../../../constants/coins';
import styles from './styles.module.scss';

interface IProps {
  nameCoin: Coin,
  balance?: number,
  className: string,
  onSelectToken: (coin: Coin) => void,
  onClickMax: (() => void) | undefined,
}

export const CoinBalance: FC<IProps> = ({
  nameCoin, balance, onSelectToken, className, onClickMax,
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
            onClick={() => onSelectToken(nameCoin)}
            aria-hidden="true"
          />
        </div>
        <div className={styles.balance_wrap}>
          <div
            className={styles.name_wrap}
            onClick={() => onSelectToken(nameCoin)}
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
              <div className={styles.balance_value}>{balance}</div>
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
