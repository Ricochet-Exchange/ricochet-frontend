import React from 'react';
import styles from './styles.module.scss';

type Props = {
  text?: string;
};

export const BalanceText: React.FC<Props> = ({ text }) => (
  <div className={styles.balance}>
    {text}
  </div>
);
