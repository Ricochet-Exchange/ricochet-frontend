import { registerToken } from 'api/ethereum';
import { Button } from 'components/common/Button';
import {
  RICCoinOptions, USDCCoinOptions,
  USDCxCoinOptions, WBTCCoinOptions,
  WBTCxCoinOptions, WETHCoinOptions, 
  WETHxCoinOptions, 
} from 'constants/index';
import React, { useCallback } from 'react';
import { CoinOption } from 'types/coinOption';
import styles from './styles.module.scss';

export const CoinsList:React.FC = () => {
  const addCoin = useCallback((options: CoinOption) => () => {
    registerToken(options);
  }, []);

  return (
    <div className={styles.list}>
      <Button onClick={addCoin(RICCoinOptions)} label="ADD RIC" />
      <Button onClick={addCoin(USDCxCoinOptions)} label="ADD USDCx" />
      <Button onClick={addCoin(USDCCoinOptions)} label="ADD USDC" />
      <Button onClick={addCoin(WETHCoinOptions)} label="ADD WETH" />
      <Button onClick={addCoin(WETHxCoinOptions)} label="ADD WETHx" />
      <Button onClick={addCoin(WBTCxCoinOptions)} label="ADD WBTCx" />
      <Button onClick={addCoin(WBTCCoinOptions)} label="ADD WBTC" />
    </div>
  );
};
