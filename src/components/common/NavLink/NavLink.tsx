import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Children, FC } from 'react';

type NavLinkProps = {
  children: React.ReactElement;
  exact?: boolean;
  activeClassName?: string;
} & {
  // TODO: TYPE NEEDS FIXING
  as?: any;
  href?: any;
};

export const NavLink: FC<NavLinkProps> = ({
  children,
  exact = false,
  activeClassName = '',
  ...props
}) => {
  const { asPath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || '';

  // pages/index.js will be matched via props.href
  // pages/about.js will be matched via props.href
  // pages/[slug].js will be matched via props.as

  const isActive = exact
    ? props.as === asPath ||
      props.href.pathname === asPath ||
      props.href === asPath
    : asPath.startsWith(props.as) ||
      asPath.startsWith(props.href) ||
      asPath.startsWith(props.href.pathname);

  const className = isActive
    ? `${childClassName} ${activeClassName}`.trim()
    : childClassName;

  return (
    <Link href={props.href} {...props}>
      {React.cloneElement(child, {
        className: className || null,
      })}
    </Link>
  );
};
