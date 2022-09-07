import React from 'react';
import { swap } from 'utils/swap/swap';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
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
			}}
		>
			SwapPage
			<button
				onClick={() => {
					swap(
						{
							_from: '0xCAa7349CEA390F89641fe306D93591f87595dc1F',
							_to: '0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2',
							amountIn: '5',
							amountOutMin: '0',
							path: [
								'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
								'0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
							],
							poolFees: '500',
							_hasUnderlyingFrom: true,
							_hasUnderlyingTo: true,
						},
						web3,
						address,
					);
				}}
			>
				Swap
			</button>
		</div>
	);
}
