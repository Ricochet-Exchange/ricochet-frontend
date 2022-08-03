import React, { useCallback } from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

type Props = {
	to: string;
	className?: string;
	activeClassName?: string;
	children?: any;
	opacityFull?: boolean;
};

const Link: React.FC<Props> = ({ to, className, activeClassName, children, opacityFull = false }) => {
	const onMouseDown = useCallback((e: any) => e.stopPropagation(), []);

	return (
		<NavLink
			to={to}
			className={cx(styles.link, className)}
			activeClassName={activeClassName}
			onMouseDown={onMouseDown}
			style={{ opacity: opacityFull ? '1' : '' }}
		>
			{children}
		</NavLink>
	);
};

export default Link;
