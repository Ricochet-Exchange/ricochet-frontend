import React from 'react';
import { InvestNav } from 'components/layout/InvestNav';
import styles from './styles.module.scss';

interface IProps {}

export const TradeContainer :React.FC<IProps> = () => {
  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.container}>
        
      </div>
    </div>
  );
};
