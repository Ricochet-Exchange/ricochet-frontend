import React, { FC } from 'react';
import { VaultsContainer } from 'containers/main/VaultsContainer';
import styles from './styles.module.scss';

interface IProps {}

export const VaultsPage: FC<IProps> = () => (
  <div className={styles.content}>
    <VaultsContainer />
  </div>
);
