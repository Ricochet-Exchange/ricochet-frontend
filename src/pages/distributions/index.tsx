import React, { FC } from 'react';
import styles from '../invest/styles.module.scss';
import { DistributionContainer } from 'containers/main/DistributionContainer';

interface IProps {}

const DistributionPage: FC<IProps> = () => (
  <div className={styles.content}>
    <DistributionContainer />
  </div>
);

export default DistributionPage;
