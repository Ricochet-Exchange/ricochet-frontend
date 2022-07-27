import React from 'react';
import cx from 'classnames';
import { LoadingPopUp } from 'components/common/LoadingPopUp';
import { Loader } from '../Loader';
import styles from './styles.module.scss';

type Props = {
	isLoading?: boolean;
	className?: string;
	classNameLoader?: string;
	loadingType?: string;
	children?: any;
};

export const LoadingWrapper: React.FC<Props> = ({ children, isLoading, className, classNameLoader, loadingType }) => (
	<div className={cx(styles.wrap, className)}>
		{children}
		{isLoading && (
			<div className={cx(styles.loader, classNameLoader)}>
				{loadingType !== 'spinner' && loadingType !== '' ? <LoadingPopUp /> : <Loader />}
			</div>
		)}
	</div>
);
