import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';

export default function HoverCard() {
	return (
		<Card sx={{ minWidth: 275, maxWidth: 345 }}>
			<CardContent>
				<Typography>Streaming</Typography>
				<Typography>1000 USDC per month</Typography>
				<Typography>Already spent</Typography>
				<Typography>
					200 USDC
					<br />
					To purchase
				</Typography>
				<Typography variant="body2">0.08 RIC</Typography>
			</CardContent>
			<CardActions>
				<Stack spacing={2} direction="row">
					<Button size="small">Edit</Button>
					<Button size="small">Stop</Button>
				</Stack>
			</CardActions>
		</Card>
	);
}
