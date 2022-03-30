import React from 'react';
import { NavLink } from '../NavLink';

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
