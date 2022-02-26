import React, { FC } from 'react';
import styles from '../InvestPage/styles.module.scss';
import { DistributionContainer } from '../../containers/main/DistributionContainer';

interface IProps {
}

const DistributionPage: FC<IProps> = () => (
  <div className={styles.content}>
    <DistributionContainer />
  </div>
);

export { DistributionPage };
