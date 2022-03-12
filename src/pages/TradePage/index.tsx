import React, { FC } from 'react';
import { TradeContainer } from 'containers/main/TradeContainer';
import styles from './styles.module.scss';

interface IProps {}

const TradePage: FC<IProps> = () => (
  <div className={styles.content}>
    <TradeContainer />
  </div>
);

export { TradePage };
