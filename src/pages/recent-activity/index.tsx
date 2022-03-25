import React, { FC } from 'react';
import { RecentActivityContainer } from 'containers/main/RecentActivityContainer';
import styles from './styles.module.scss';

interface IProps {}

const RecentActivityPage: FC<IProps> = () => (
  <div className={styles.content}>
    <RecentActivityContainer />
  </div>
);

export default RecentActivityPage;
