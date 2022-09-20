import Big from 'big.js';
import { FC, ReactElement, useEffect, useMemo, useState } from 'react';
import { calculateFlowRate } from 'utils/calculateFlowRate';

const ANIMATION_MINIMUM_STEP_TIME = 50;

export interface FlowingBalanceProps {
	/**
	 * The available token balance
	 */
	balance?: string | number;
	/**
	 * Current balance already streamed
	 */
	streamedSoFar: string | number;

	/**
	 * Timestamp of above balance snapshot
	 */
	streamedSoFarTimestamp: number;

	/**
	 * Current flow rate in tokens/month
	 */
	flowRatePerMonth: string;

	/**
	 * Defines either decreasing (-1) or increasing (+1)
	 */
	direction?: -1 | 1;

	/**
	 * Used to convert flowRate in Ether/Wei to Token price
	 */
	conversionMultiplier?: number;
}

export const AnimatedAmount: FC<FlowingBalanceProps> = ({
	balance = '0',
	streamedSoFar = '0',
	streamedSoFarTimestamp = 0,
	flowRatePerMonth = 0,
	direction = 1,
	conversionMultiplier = 1,
}): ReactElement => {
	const bigExistingBalance = useMemo(() => Big(balance), [balance]);
	const flowRatePerSecond = calculateFlowRate(Number(flowRatePerMonth)) ?? 0;
	const bigBalance = useMemo(() => Big(streamedSoFar), [streamedSoFar]);

	const [weiValue, setWeiValue] = useState(bigBalance);

	useEffect(() => setWeiValue(bigBalance), [bigBalance]);

	const balanceTimestampMs = useMemo(() => {
		return Big(streamedSoFarTimestamp).mul(1000);
	}, [streamedSoFarTimestamp]);

	useEffect(() => {
		const flowRateBigNumber = Big(flowRatePerSecond);
		if (flowRateBigNumber.eq(0)) {
			return; // No need to show animation when flow rate is zero.
		}

		let stopAnimation = false;
		let lastAnimationTimestamp: DOMHighResTimeStamp = 0;

		const animationStep = (currentAnimationTimestamp: DOMHighResTimeStamp) => {
			if (stopAnimation) {
				return;
			}

			if (currentAnimationTimestamp - lastAnimationTimestamp > ANIMATION_MINIMUM_STEP_TIME) {
				const currentTimestampBigNumber = Big(
					new Date().valueOf(), // Milliseconds elapsed since UTC epoch, disregards timezone.
				);

				const elapsed = currentTimestampBigNumber.sub(balanceTimestampMs).mul(flowRateBigNumber.div(1e18));

				if (direction === 1) {
					setWeiValue(
						bigBalance.add(elapsed).div(1000), // converting to per second value
					);
				} else if (direction === -1) {
					setWeiValue(
						bigBalance.sub(elapsed).div(1000), // converting to per second value
					);
				}

				lastAnimationTimestamp = currentAnimationTimestamp;
			}

			window.requestAnimationFrame(animationStep);
		};

		window.requestAnimationFrame(animationStep);

		return () => {
			stopAnimation = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [streamedSoFar, streamedSoFarTimestamp, flowRatePerMonth]);

	const finalWeiValue = weiValue.mul(direction).mul(conversionMultiplier);

	if (direction > 0) {
		return (
			<span style={{ fontVariantNumeric: 'tabular-nums' }}>
				{bigExistingBalance.add(finalWeiValue).toFixed(8).toString()}{' '}
			</span>
		);
	}
	return (
		<span style={{ fontVariantNumeric: 'tabular-nums' }}>
			{bigExistingBalance.sub(finalWeiValue).toFixed(8).toString()}{' '}
		</span>
	);
};
