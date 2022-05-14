import React, { FC } from 'react';
import { SwapContainer } from 'containers/main/SwapContainer';
import styles from './styles.module.scss';

interface IProps {}

const SwapPage: FC<IProps> = () => (
  <div className={styles.content}>
    <SwapContainer />
  </div>
);

export { SwapPage };
