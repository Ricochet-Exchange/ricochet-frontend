import React, { FC } from 'react';
import { InvestContainer } from 'containers/main/InvestContainer';
import styles from './styles.module.scss';

interface IProps {}

const InvestPage: FC<IProps> = () => (
  <div className={styles.content}>
    <InvestContainer />
  </div>
);

export { InvestPage };
