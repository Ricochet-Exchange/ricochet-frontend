import React, { useCallback } from 'react';
import cx from 'classnames';
import { NavLink } from '../NavLink';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactElement;
  to: string;
  activeClassName?: string;
};

const Link: React.FC<Props> = ({ to, activeClassName, children }) => {
  return (
    <NavLink href={to} activeClassName={activeClassName}>
      {children}
    </NavLink>
  );
};

export default Link;
