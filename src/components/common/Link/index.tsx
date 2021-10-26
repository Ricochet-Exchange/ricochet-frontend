import React, { useCallback } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

type Props = {
  to: string;
  className?: string;
  activeClassName?: string
};

const Link:React.FC<Props> = ({ 
  to, 
  className,
  activeClassName, 
  children,
}) => {
  const onMouseDown = useCallback((e) => e.stopPropagation(), []);

  return (
    <NavLink
      to={to} 
      className={cx(styles.link, className)} 
      activeClassName={activeClassName}
      onMouseDown={onMouseDown}
    >
      {children}
    </NavLink>
  );
};

export default Link;
