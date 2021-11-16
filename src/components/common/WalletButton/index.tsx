import React, { FC } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import ButtonNew from 'components/common/ButtonNew';
import { trimPad } from 'utils/balances';
import styles from './styles.module.scss';

interface IProps {
  account: string;
  ricBalance?: string;
}

export const WalletButton: FC<IProps> = ({ ricBalance = '', account }) => (
  <ButtonNew className={styles.balance_panel}>
    <div className={styles.balance}>{`${trimPad(ricBalance, 6)} RIC`}</div>
    <div className={styles.address}>{account.substring(0, 10)}</div>
    <div className={styles.icon_wrap}>
      <FontIcon
        className={styles.icon}
        name={FontIconName.RicoUser}
        size={16}
      />
    </div>
  </ButtonNew>
);
