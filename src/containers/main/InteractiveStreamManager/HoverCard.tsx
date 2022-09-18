import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useCallback, useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import { AnimatedAmount } from 'components/common/AnimatedAmount';
import { showErrorToast } from 'components/common/Toaster';
import type { StreamModalProps } from './StreamModal';

type HoverCardProps = Pick<StreamModalProps, 'handleOpen' | 'onClickStop'> & {
	coinA: string;
	coinB: string;
	stream: any;
	streamTimestamp: any;
	flowRate: any;
	setShowStreamCard: React.Dispatch<React.SetStateAction<boolean>>;
	onStop: any;
	coinAconversionMultiplier: number;
	coinBconversionMultiplier: number;
};

export default function HoverCard({
	handleOpen,
	onClickStop,
	setShowStreamCard,
	coinA,
	coinB,
	onStop,
	stream,
	flowRate,
	streamTimestamp,
	coinAconversionMultiplier,
	coinBconversionMultiplier,
}: HoverCardProps) {
	const [isLoading, setIsLoading] = useState(false);
	const stopStream = useCallback(() => {
		setIsLoading(true);
		const callback = (e?: string) => {
			if (e) {
				showErrorToast(e, 'Error');
				setIsLoading(false);
			} else {
				onStop();
				setIsLoading(false);
				setShowStreamCard(false);
			}
		};
		onClickStop(callback);
	}, [onClickStop, onStop, setShowStreamCard]);
	return (
		<Card
			sx={{
				minWidth: 275,
				maxWidth: 345,
				position: 'absolute',
				top: 0,
				right: 0,
				zIndex: 5,
				textAlign: 'center',
			}}
		>
			<CardContent>
				<Typography>Streaming</Typography>
				<Typography>
					<span>
						{flowRate} {coinA}
					</span>{' '}
					per month
				</Typography>
				<br />
				{stream && streamTimestamp && (
					<>
						<Typography>Already spent</Typography>
						<Typography sx={{ color: '#2775ca' }}>
							<AnimatedAmount
								balance={stream}
								flowRatePerMonth={flowRate}
								streamedSoFar={stream}
								streamedSoFarTimestamp={streamTimestamp}
							/>
							{coinA}
						</Typography>
					</>
				)}
				<br />
				{stream && streamTimestamp && (
					<>
						<Typography>{coinAconversionMultiplier ? 'Received so far' : 'To purchase'}</Typography>
						<Typography sx={{ color: '#2775ca' }}>
							{coinAconversionMultiplier > 0 && (
								<AnimatedAmount
									balance={0}
									flowRatePerMonth={flowRate}
									streamedSoFar={stream}
									streamedSoFarTimestamp={streamTimestamp}
									conversionMultiplier={coinAconversionMultiplier}
								/>
							)}
							{coinB}
						</Typography>
					</>
				)}
				<br />
			</CardContent>
			<CardActions>
				<Stack spacing={16} direction="row" sx={{ justifyContent: 'center' }}>
					<Button variant="contained" onClick={handleOpen}>
						Edit
					</Button>
					<LoadingButton loading={isLoading} variant="contained" onClick={stopStream}>
						Stop
					</LoadingButton>
				</Stack>
			</CardActions>
		</Card>
	);
}
