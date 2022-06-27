import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { showErrorToast, showSuccessToast, showToast } from 'components/common/Toaster';
import type { Row } from './Markets';

type OperationProps = {
	account: string;
	inflowRate: string;
	onStart: any;
	onClickStop: (callback: (e?: string) => void) => void;
	showStreamCard: boolean;
	setShowStreamCard: Dispatch<SetStateAction<boolean>>;
	row: Row;
};

export const Operation: FC<OperationProps> = ({
	account,
	inflowRate,
	onStart,
	onClickStop,
	showStreamCard,
	setShowStreamCard,
	row,
}) => {
	const [isLoading, setIsLoading] = useState(false);

	const stopStream = useCallback(() => {
		setIsLoading(true);
		showToast('Stopping stream...');
		const callback = (e?: string) => {
			if (e) {
				showErrorToast(e, 'Error');
				setIsLoading(false);
			} else {
				showSuccessToast('Terminated the stream successfully!', 'Success');
				setIsLoading(false);
				if (showStreamCard) {
					setShowStreamCard(false);
				}
			}
		};
		onClickStop(callback);
	}, [onClickStop, setShowStreamCard, showStreamCard]);

	return (
		<Stack direction="row" spacing={1}>
			{/* has stream? */}
			{!inflowRate ? (
				<IconButton
					color="success"
					aria-label="start a stream"
					disabled={!account || isLoading}
					onClick={() => onStart(row)}
				>
					<Tooltip title={'start a stream'} placement="top" enterTouchDelay={0}>
						<PlayArrowIcon />
					</Tooltip>
				</IconButton>
			) : (
				<IconButton
					color="success"
					aria-label="edit the stream"
					disabled={!account || isLoading}
					onClick={() => onStart(row)}
				>
					<Tooltip title={'edit the stream'} placement="top" enterTouchDelay={0}>
						<PauseIcon />
					</Tooltip>
				</IconButton>
			)}
			{/* has stream? */}
			<IconButton
				color="error"
				aria-label="stop the stream"
				disabled={!inflowRate || isLoading}
				onClick={stopStream}
			>
				<Tooltip title={'stop the stream'} placement="top" enterTouchDelay={0}>
					<StopIcon />
				</Tooltip>
			</IconButton>
		</Stack>
	);
};
