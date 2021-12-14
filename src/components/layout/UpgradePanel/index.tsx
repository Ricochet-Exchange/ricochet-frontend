import React, {
  ChangeEvent,
  FC,
} from 'react';
import { TextInput } from 'components/common/TextInput';
import { Coin } from '../../../constants/coins';
import { CoinBalance } from '../CoinBalance';
import { UpgradeDowngradeButtons } from '../UpgradeDowngradeButtons';
import styles from './styles.module.scss';

interface IProps {
  balance? : string,
  value: string,
  placeholder?: string,
  isUpgrade: boolean,
  nameCoin: Coin,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
  onClickApprove?: () => void,
  onClickUpgrade?: () => void,
  onSelectToken: (coin: Coin) => void,
  onClickDowngrade?: () => void,
  onClickMax?: () => void,
  isLoading?: boolean;
  isReadOnly?:boolean,
  disabledApprove?:boolean;
}

export const UpgradePanel: FC<IProps> = ({
  balance = '',
  nameCoin,
  placeholder,
  isLoading,
  isReadOnly,
  disabledApprove,
  onChange,
  onClickApprove,
  onClickUpgrade,
  onClickDowngrade,
  onClickMax,
  value,
  isUpgrade,
  onSelectToken,
}) => (
  <section className={styles.panel_mob}>
    <section className={styles.panel}>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <CoinBalance
            className={styles.label} 
            nameCoin={nameCoin} 
            balance={Number(balance)} 
            onSelectToken={onSelectToken}
            onClickMax={onClickMax}
          />
        </div>
        <div className={styles.input_wrap}>
          <TextInput
            value={value}
            className={styles.input}
            onChange={onChange} 
            containerClassName={styles.container_input} 
            placeholder={placeholder}
            type="number"
            onClickMax={onClickMax}
            isLoading={isLoading}
            isReadOnly={isReadOnly}
          />
        </div>
        <div className={styles.buttons}>
          <UpgradeDowngradeButtons 
            onClickApprove={onClickApprove}
            onClickUpgrade={onClickUpgrade}
            onClickDowngrade={onClickDowngrade}
            isUpgrade={isUpgrade}
            isLoading={isLoading}
            disabledApprove={disabledApprove}
            isReadOnly={isReadOnly}

          />
        </div>
      </div>
    </section>
    <div className={styles.buttons_mob}>
      <UpgradeDowngradeButtons 
        onClickApprove={onClickApprove}
        onClickUpgrade={onClickUpgrade}
        onClickDowngrade={onClickDowngrade}
        isUpgrade={isUpgrade}
        isLoading={isLoading}
        isReadOnly={isReadOnly}
      />
    </div>
  </section>
);
