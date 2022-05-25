import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

import type { StreamModalProps } from './StreamModal';

type HoverCardProps = Pick<StreamModalProps, 'handleOpen' | 'handleStop'> & {
	setShowStreamCard: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HoverCard({ handleOpen, handleStop, setShowStreamCard }: HoverCardProps) {
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
					<span>1000 USDC</span> per month
				</Typography>
				<br />
				<br />
				<Typography>Already spent</Typography>
				<Typography>
					200 USDC
					<br />
					To purchase
				</Typography>
				<Typography variant="body2">0.08 RIC</Typography>
				<br />
			</CardContent>
			<CardActions>
				<Stack spacing={16} direction="row" sx={{ justifyContent: 'center' }}>
					<Button
						variant="contained"
						onClick={() => {
							handleOpen();
							console.log('Updated Stream!');
						}}
					>
						Edit
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							handleStop();
							setShowStreamCard(false);
							console.log('Stream stopped!');
						}}
					>
						Stop
					</Button>
				</Stack>
			</CardActions>
		</Card>
	);
}
