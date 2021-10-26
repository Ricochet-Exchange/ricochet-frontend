import ButtonNew from 'components/common/ButtonNew';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { Coin, iconsCoin } from 'constants/coins';
import React, {
  FC,
} from 'react';
import styles from './styles.module.scss';

interface IProps {
  nameCoinLeft: Coin,
  nameCoinRight: Coin,
}

export const CoinChange: FC<IProps> = ({
  nameCoinLeft, nameCoinRight,
}) => (
  <div className={styles.currency}>
    <div className={styles.labels}>
      <ButtonNew name={nameCoinLeft} className={styles.img_usd}>
        <img src={iconsCoin[nameCoinLeft]} alt={nameCoinLeft} />
      </ButtonNew>
      <ButtonNew className={styles.img_bitcoin}>
        <img src={iconsCoin[nameCoinRight]} alt={nameCoinRight} />
      </ButtonNew>
    </div>
    <div className={styles.currency_name_container}>
      <div className={styles.currency_name}>
        <div className={styles.currency_first}>{nameCoinLeft}</div>
        <div className={styles.arrow_circle_container}>
          <FontIcon
            name={FontIconName.ArrowRightCircled} 
            className={styles.arrow_circle}
            size={20}
          /> 
        </div>
        <div className={styles.currency_second}>{nameCoinRight}</div>
      </div>
    </div>
  </div>
);
