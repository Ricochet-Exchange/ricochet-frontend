import React, { SetStateAction } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

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

type StreamModalProps = {
	open: boolean;
	handleOpen: (value: SetStateAction<any>) => void;
	handleClose: (value: SetStateAction<any>) => void;
};

export default function StreamModal({ open, handleOpen, handleClose }: StreamModalProps) {
	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				aria-labelledby="transition-modal-title"
				aria-describedby="transition-modal-description"
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}
			>
				<Fade in={open}>
					<Box sx={style}>
						<Typography id="transition-modal-title" variant="h6" component="h2">
							Starting streaming
						</Typography>
						<Typography>500</Typography>
						<Typography>USDC</Typography>
						<Typography>per month into</Typography>
						<Typography>BTC</Typography>
						<Typography id="transition-modal-description" sx={{ mt: 2 }}>
							Please make sure all the information here is correct!
						</Typography>
						<Stack spacing={2} direction="row">
							{/* if no streams before */}
							<Button variant="text">Start</Button>
							{/* else */}
							<Button variant="contained">Update</Button>
							<Button variant="outlined">Stop</Button>
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
