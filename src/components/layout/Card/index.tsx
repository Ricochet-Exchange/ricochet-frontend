import React from 'react';
import cx from 'classnames';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import styles from './styles.module.scss';

type Props = {
  title?: string | JSX.Element
  main?: boolean;
  children?: JSX.Element;
  isLoading?: boolean;
};

export const Card:React.FC<Props> = ({
  title, main, children, isLoading, 
}) => (
  <div className={cx(styles.card, { [styles.main]: main })}>
    <LoadingWrapper isLoading={isLoading}>
      <div className={styles.content}>
        <div className={styles.title}>
          {title}
        </div>
        <hr className={styles.line} />
        {children}
      </div>
    </LoadingWrapper>
  </div>
);
