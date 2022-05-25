import React, { SetStateAction, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

export type StreamModalProps = {
	open: boolean;
	handleOpen: any;
	handleClose: any;
	handleStart: any;
	activeEdge: any;
	setEdges: any;
	resetNodes: any;
	hasStream: boolean;
	handleStop: any;
};

export default function StreamModal({
	open,
	handleOpen,
	handleClose,
	handleStart,
	activeEdge,
	setEdges,
	resetNodes,
	hasStream,
	handleStop,
}: StreamModalProps) {
	useEffect(() => {
		console.log('activeEdge', activeEdge);
	}, [activeEdge]);
	return (
		<div>
			<Modal
				aria-labelledby="streaming-modal"
				aria-describedby="start-edit-or-stop-stream"
				open={open}
				onClose={() => {
					handleClose();
					setEdges((prev: any) => {
						console.log('prev', prev);
						const current = prev.filter((edge: any) => edge.id !== activeEdge[0].id);
						console.log('current', current);
						return current;
					});
					resetNodes();
				}}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
				sx={{ textAlign: 'center' }}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							{hasStream ? 'Current Streaming' : 'Start Streaming'}
						</Typography>
						{hasStream ? (
							<Typography fontSize={48}>500</Typography>
						) : (
							<Box
								component="form"
								sx={{
									'& > :not(style)': { m: 1, width: '25ch' },
								}}
								noValidate
								autoComplete="off"
							>
								<TextField id="outlined-basic" label="Outlined" variant="outlined" />
							</Box>
						)}
						<Typography color="#2775ca" fontWeight="bold" fontSize={24}>
							USDC
						</Typography>
						<Typography>per month into</Typography>
						<Typography color="#2775ca" fontWeight="bold" fontSize={24}>
							BTC
						</Typography>
						{hasStream ? null : (
							<Typography id="transition-modal-description" sx={{ mt: 2, color: 'red' }}>
								Please make sure all the information here is correct!
							</Typography>
						)}
						<Stack spacing={16} direction="row" sx={{ justifyContent: 'center' }}>
							{/* if no streams before */}
							{hasStream ? (
								<>
									<Button variant="contained">Update</Button>
									<Button variant="outlined" onClick={handleStop}>
										Stop
									</Button>
								</>
							) : (
								<Button
									variant="contained"
									onClick={() => {
										handleStart();
										resetNodes();
										handleClose();
									}}
								>
									Start
								</Button>
							)}
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
