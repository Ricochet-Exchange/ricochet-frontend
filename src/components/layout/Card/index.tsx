import React from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  title?: string | JSX.Element
  main?: boolean;
  children?: JSX.Element
};

export const Card:React.FC<Props> = ({ title, main, children }) => (
  <div className={cx(styles.card, { [styles.main]: main })}>
    <div className={styles.title}>
      {title}
    </div>
    <hr className={styles.line} />
    {children}
  </div>
);
