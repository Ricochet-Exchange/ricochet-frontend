import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

type OperationProps = {
	account: string;
	inflowRate: string;
};

export const Operation: FC<OperationProps> = ({ account, inflowRate }) => {
	return (
		<Stack direction="row" spacing={1}>
			{/* has stream? */}
			{!inflowRate ? (
				<IconButton color="success" aria-label="start a stream" disabled={!account}>
					<Tooltip title={'start a stream'} placement="top" enterTouchDelay={0}>
						<PlayArrowIcon />
					</Tooltip>
				</IconButton>
			) : (
				<IconButton color="success" aria-label="edit the stream" disabled={!account}>
					<Tooltip title={'edit the stream'} placement="top" enterTouchDelay={0}>
						<PauseIcon />
					</Tooltip>
				</IconButton>
			)}
			{/* has stream? */}
			<IconButton color="error" aria-label="stop the stream" disabled={!inflowRate}>
				<Tooltip title={'stop the stream'} placement="top" enterTouchDelay={0}>
					<StopIcon />
				</Tooltip>
			</IconButton>
		</Stack>
	);
};
