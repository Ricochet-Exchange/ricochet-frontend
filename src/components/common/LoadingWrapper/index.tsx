import React from 'react';
import cx from 'classnames';
import { Loader } from '../Loader';
import styles from './styles.module.scss';

type Props = {
  loadingBar?: boolean;
  isLoading?: boolean;
  className?: string;
  classNameLoader?: string;
  loadingReason?: string;
};

export const LoadingWrapper: React.FC<Props> = ({
  children,
  isLoading,
  className,
  classNameLoader,
  loadingReason,
  loadingBar,
}) => (
  <div className={cx(styles.wrap, className)}>
    {children}
    {isLoading && (
    <div className={cx(styles.loader, classNameLoader)}>
      {loadingBar ? <div className={styles.loading_bar} /> : null}
      <Loader size={64} />

      <h2 className={styles.loading_reason_header}>
        {loadingReason}
      </h2>

    </div>
    )}
  </div>
);
