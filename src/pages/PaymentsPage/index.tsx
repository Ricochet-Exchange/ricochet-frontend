import React, { FC } from 'react';
import { PaymentsContainer } from 'containers/main/PaymentsContainer';
import styles from './styles.module.scss';

interface PayProps {}

const PaymentsPage: FC<PayProps> = () => (
  <div className={styles.content}>
    <PaymentsContainer />
  </div>
);

export { PaymentsPage };
