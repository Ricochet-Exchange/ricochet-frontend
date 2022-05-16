import React, { FC } from 'react';
import styles from './styles.module.scss';
import { PaymentsContainer } from 'containers/main/PaymentsContainer';

interface PayProps {}

const PaymentsPage: FC<PayProps> = () => (
  <div className={styles.content}>
    <PaymentsContainer />
  </div>
);

export { PaymentsPage };
