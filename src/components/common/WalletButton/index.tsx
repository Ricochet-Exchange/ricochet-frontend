import React, { FC, useState } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import ButtonNew from 'components/common/ButtonNew';
import { numFormatter } from 'utils/balances';
import { useDispatch } from 'react-redux';
import { mainCheck } from 'store/main/actionCreators';
import styles from './styles.module.scss';
import { useModal } from '../../../hooks/useModal';
import { ModalType } from '../../../store/modal/types';

interface IProps {
  account: string;
  ricBalance?: string;
  mobile?: boolean;
  isReadOnly?:boolean;
}

export const WalletButton: FC<IProps> = ({
  ricBalance = '', account, mobile, isReadOnly, 
}) => {
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const preConnect = account === 'Connect Wallet';
  const [connecting, setConnecting] = useState(false);
  const dispatchMain = () => {
    if (preConnect) {
      setConnecting(true);
      dispatch(mainCheck());
    }
  };
  if (!preConnect && connecting) {
    setConnecting(false);
  }
  return (
    <>
      {!isReadOnly && (
      <ButtonNew className={styles.balance_panel} onClick={dispatchMain}>
        {!mobile && (
        <div className={styles.balance}>
          {!preConnect &&
        ricBalance &&
        `${numFormatter(parseFloat(ricBalance))} RIC`}
        </div>
        )}
        <div className={styles.address}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {connecting ? 'Connecting' : (mobile ? (preConnect ? account : 'Connected') : (preConnect ? account : account.substring(0, 6)))}
        </div>
      
        <div className={styles.icon_wrap}>
          {!preConnect && (
          <FontIcon
            className={styles.icon}
            name={FontIconName.RicoUser}
            size={16}
          />
          )}
        </div>
      
      </ButtonNew>
      )}
      {isReadOnly && (
        <ButtonNew className={styles.balance_panel} onClick={showModal(ModalType.Metamask)}>
          <div className={styles.connect_wallet}>Connect Wallet</div>
        </ButtonNew>
      )}
    </>
  );
};
