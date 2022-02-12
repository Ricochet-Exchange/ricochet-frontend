import React, { FC, useState } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import ButtonNew from 'components/common/ButtonNew';
import { numFormatter } from 'utils/balances';
import { useDispatch } from 'react-redux';
import { connectWeb3Modal } from 'store/main/actionCreators';
import useENS from 'hooks/useENS';
import styles from './styles.module.scss';

interface IProps {
  account: string;
  ricBalance?: string;
  mobile?: boolean;
}

export const WalletButton: FC<IProps> = ({
  ricBalance = '', account, mobile,
}) => {
  const dispatch = useDispatch();
  const preConnect = account === 'Connect Wallet';
  const [connecting, setConnecting] = useState(false);
  const { ensName, ensAvatar } = useENS(account);

  const dispatchConnectWeb3Modal = () => {
    if (preConnect) {
      setConnecting(true);
      dispatch(connectWeb3Modal());
    }
  };
  if (!preConnect && connecting) {
    setConnecting(false);
  }

  return (
    <ButtonNew className={styles.balance_panel} onClick={dispatchConnectWeb3Modal}>
      {!mobile && (
        <div className={styles.balance}>
          {!preConnect &&
        ricBalance &&
        `${numFormatter(parseFloat(ricBalance))} RIC`}
        </div>
      )}
      <div className={styles.address}>
        {/* eslint-disable-next-line no-nested-ternary */}
        {connecting ? 'Connecting' : (mobile ? (preConnect ? ensName || account : 'Connected') : (preConnect ? account : ensName || account.substring(0, 6)))}
      </div>

      <div className={styles.icon_wrap}>
        {!preConnect && (
          ensAvatar ? <img className={styles.avatar} src={ensAvatar} alt="user avatar" />
            : (
              <FontIcon
                className={styles.icon}
                name={FontIconName.RicoUser}
                size={16}
              />
            )
        )}
      </div>

    </ButtonNew>
  );
};
