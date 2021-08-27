import React from 'react';
import { Loader } from '../Loader';
import styles from './styles.module.scss';

type Props = {
  isLoading?: boolean;
};

export const LoadingWrapper: React.FC<Props> = ({ children, isLoading }) => (
  <div className={styles.wrap}>
    {children}
    {isLoading && (
    <div className={styles.loader}>
      <Loader size={64} />
    </div>
    )}
  </div>
);
