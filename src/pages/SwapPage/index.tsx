import React from 'react';
import SwapForm from './layout/Checkout/SwapForm';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { LoadingPopUp } from 'components/common/LoadingPopUp';
import Web3 from 'web3';

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
				padding: '5em',
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
							width: '30vw',
							backgroundColor: 'white',
							padding: '1em',
						}}
					>
						<SwapForm />
					</div>
				) : (
					<LoadingPopUp />
				)}
			</div>
		</div>
	);
}
