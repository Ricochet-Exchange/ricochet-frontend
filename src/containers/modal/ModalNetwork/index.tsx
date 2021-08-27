import React, { useCallback } from 'react';
import { Button } from 'components/common/Button';
import { useDispatch } from 'react-redux';
import { mainSwitchNetwork } from 'store/main/actionCreators';
import styles from './styles.module.scss';

export const ModalNetwork:React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(mainSwitchNetwork());
  }, [dispatch]);

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>You should switch to Matic network</p>
      <ul className={styles.params}>
        <li>
          <span className={styles.label}>name - </span>
          Matic
        </li>
        <li>
          <span className={styles.label}>chainId - </span>
          137
        </li>
        <li>
          <span className={styles.label}>RPC URL - </span>
          https://rpc-mainnet.matic.network

        </li>
        <li>
          <span className={styles.label}>Block Explorer URL - </span>
          https://polygonscan.com
        </li>
      </ul>
      <Button 
        onClick={handleClick}
        label="SWITCH TO MATIC"
        className={styles.button}
      />
    </div>
  );
};
