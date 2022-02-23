import React from 'react';
import cx from 'classnames';
import { LoadingPopUp } from 'components/common/LoadingPopUp';
import styles from './styles.module.scss';

type Props = {
  isLoading?: boolean;
  className?: string;
  classNameLoader?: string;
};

export const LoadingWrapper: React.FC<Props> = ({
  children,
  isLoading,
  className,
  classNameLoader,
}) => (
  <div className={cx(styles.wrap, className)}>
    {children}
    {isLoading && (
    <div className={cx(styles.loader, classNameLoader)}>
      <LoadingPopUp />
    </div>
    )}
  </div>
);
