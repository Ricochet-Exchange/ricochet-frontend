import React from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { LoadingPopUp } from 'components/common/LoadingPopUp';
import Web3 from 'web3';
import SwapContainer from './layout/Checkout/SwapContainer';
import styles from './styles.module.scss';

export function SwapPage() {
	const { address, web3 } = useShallowSelector(selectMain);

	return (
		<div
			style={{
				backgroundColor: '#242729',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				overflowY: 'scroll',
				padding: '2em',
			}}
		>
			<div
				style={{
					width: '100%',
					height: '100%',
					overflowY: 'scroll',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				{address ? (
					<div
						style={{
							backgroundColor: '#2d3233',
						}}
						className={styles.form}
					>
						<SwapContainer />
					</div>
				) : (
					<LoadingPopUp />
				)}
			</div>
		</div>
	);
}
