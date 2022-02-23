import React, { FC } from 'react';
import { BanksContainer } from 'containers/main/BanksContainer';
import styles from './styles.module.scss';

interface IProps {}

export const BanksPage: FC<IProps> = () => (
  <div className={styles.content}>
    <BanksContainer />
  </div>
);
