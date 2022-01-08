import React from 'react';
import styles from './styles.module.scss';

interface IProps {}

export const MainLayout: React.FC<IProps> = ({ children }) => (
  <div
    className={styles.container}
  >
    <div className={styles.content}>
      {children}
    </div>
  </div>
);
