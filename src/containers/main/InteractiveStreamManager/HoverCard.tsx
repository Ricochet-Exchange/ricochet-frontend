import React, { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

import type { StreamModalProps } from './StreamModal';
import { showErrorToast } from 'components/common/Toaster';
import LoadingButton from '@mui/lab/LoadingButton';

type HoverCardProps = Pick<StreamModalProps, 'handleOpen' | 'onClickStop'> & {
	coinA: string;
	coinB: string;
	stream: any;
	flowRate: any;
	setShowStreamCard: React.Dispatch<React.SetStateAction<boolean>>;
	onStop: any;
};

export default function HoverCard({
	handleOpen,
	onClickStop,
	setShowStreamCard,
	coinA,
	coinB,
	stream,
	flowRate,
	onStop,
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
				<br />
				<Typography>Already spent</Typography>
				<Typography sx={{ color: '#2775ca' }}>
					{stream} {coinA}
				</Typography>
				<br />
				<Typography>To purchase</Typography>
				<Typography sx={{ color: '#2775ca' }}>{coinB}</Typography>
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
