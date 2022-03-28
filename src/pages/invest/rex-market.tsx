import React, { FC } from 'react';
import { InvestContainer } from 'containers/main/InvestContainer';
import styles from './styles.module.scss';
import { FlowTypes } from 'constants/flowConfig';

interface IProps {}

const RexMarket: FC<IProps> = () => (
  <div className={styles.content}>
    <InvestContainer path={FlowTypes.market} />
  </div>
);

export default RexMarket;
