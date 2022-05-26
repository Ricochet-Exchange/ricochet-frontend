import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FlowTypes } from 'constants/flowConfig';
import Web3 from 'web3';
import { getShareScaler } from 'utils/getShareScaler';
import { ExchangeKeys } from 'utils/getExchangeAddress';
import { showErrorToast } from 'components/common/Toaster';
import { AFFILIATE_STATUS, getAffiliateStatus } from 'utils/getAffiliateStatus';
import { getContract } from 'utils/getContract';
import { rexReferralAddress } from 'constants/polygon_config';
import { referralABI } from 'constants/abis';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

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

const StreamActionTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(() => ({
	pointerEvents: 'auto',

	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: 'var(--color-blue)',
	},
}));

export type StreamModalProps = {
	ele: any;
	open: boolean;
	web3: Web3;
	address: any;
	isReadOnly: boolean;
	handleOpen: any;
	handleClose: any;
	onClickStart: any;
	activeEdge: any;
	setEdges: any;
	amount: string;
	setAmount: any;
	resetNodes: any;
	hasStream: boolean;
	onClickStop: any;
	flowType: any;
	onStart: any;
	onStop: any;
	deleteEdge: any;
	flowRate: any;
};

export default function StreamModal({
	ele,
	open,
	web3,
	address,
	isReadOnly,
	handleOpen,
	handleClose,
	activeEdge,
	setEdges,
	amount,
	setAmount,
	resetNodes,
	hasStream,
	onStart,
	onStop,
	flowType,
	onClickStart,
	onClickStop,
	deleteEdge,
	flowRate,
}: StreamModalProps) {
	const [shareScaler, setShareScaler] = useState(1e3);
	const [isLoading, setIsLoading] = useState(false);

	const [isAffiliate, setIsAffiliate] = useState(false);

	const contract = getContract(rexReferralAddress, referralABI, web3);

	useEffect(() => {
		let isMounted = true;

		if (address && contract) {
			(async () => {
				const affiliateStatus = await getAffiliateStatus(contract, address, web3);

				if (isMounted && affiliateStatus === AFFILIATE_STATUS.ENABLED) {
					setIsAffiliate(true);
				}
			})();
		}

		return () => {
			isMounted = false;
		};
	}, [address, contract, web3]);

	useEffect(() => {
		if (flowRate) setAmount(flowRate);
	}, [setAmount, flowRate]);

	useEffect(() => {
		let isMounted = true;

		if (web3?.currentProvider === null || flowType !== FlowTypes.market || !ele) return;
		const exchangeKey = ele.flowKey.replace('FlowQuery', '') as ExchangeKeys;
		getShareScaler(web3, exchangeKey, ele.tokenA, ele.tokenB).then((res) => {
			if (isMounted) {
				setShareScaler(res);
			}
		});
		return () => {
			isMounted = false;
		};
	}, [web3, flowType, ele]);

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const val = Number(evt.target.value);
		console.log('val: ', val);
		if (isNaN(val) || val < 0) {
			evt.preventDefault();
		} else {
			setAmount(evt.target.value);
		}
	};

	const startStream = useCallback(() => {
		if (isAffiliate) {
			showErrorToast('Affiliates can not stream', 'Error');
			return;
		}
		setIsLoading(true);

		const callback = (e?: string) => {
			if (e) {
				showErrorToast(e, 'Error');
				deleteEdge();
			} else {
				onStart();
			}
			setIsLoading(false);

			resetNodes();
			handleClose();
		};
		if (flowType === FlowTypes.market) {
			onClickStart(
				(
					((Math.floor(((parseFloat(amount) / 2592000) * 1e18) / shareScaler) * shareScaler) / 1e18) *
					2592000
				).toString(),
				callback,
			);
		} else {
			onClickStart(amount, callback);
		}
	}, [amount, deleteEdge, flowType, handleClose, isAffiliate, onClickStart, onStart, resetNodes, shareScaler]);

	const disabled =
		isReadOnly ||
		isLoading ||
		!amount ||
		((Math.floor(((parseFloat(amount) / 2592000) * 1e18) / shareScaler) * shareScaler) / 1e18) * 2592000 === 0;

	const tooltip = (
		<span style={{ fontSize: 16 }}>
			The amount per month will be rounded off to{' '}
			<span style={{ fontWeight: 700 }}>
				{(
					((Math.floor(((parseFloat(amount) / 2592000) * 1e18) / shareScaler) * shareScaler) / 1e18) *
					2592000
				).toFixed(6)}{' '}
				{activeEdge.length && activeEdge[0].source.split('-')[0]}
			</span>{' '}
			so the contracts can evenly divide it and it will take a security deposit of{' '}
			<span style={{ fontWeight: 700 }}>
				{(parseFloat(amount) / 180.0).toFixed(6)} {activeEdge.length && activeEdge[0].source.split('-')[0]}
			</span>{' '}
			from your balance. The Deposit will be refunded in full when you close the stream or lost if your balance
			hits zero with the stream still open.
		</span>
	);
	return (
		<div>
			<Modal
				aria-labelledby="streaming-modal"
				aria-describedby="start-edit-or-stop-stream"
				open={open}
				onClose={() => {
					handleClose();
					setEdges((prev: any) => {
						const current = prev.filter((edge: any) => edge.animated);
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
						<Box
							component="form"
							sx={{
								'& > :not(style)': { m: 1, width: '25ch' },
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								id="outlined-basic"
								label="Amount"
								variant="outlined"
								value={amount}
								onChange={onChange}
							/>
						</Box>
						<Typography color="#2775ca" fontWeight="bold" fontSize={24}>
							{activeEdge.length && activeEdge[0].source.split('-')[0]}
						</Typography>
						<Typography>per month into</Typography>
						<Typography color="#2775ca" fontWeight="bold" fontSize={24}>
							{activeEdge.length && activeEdge[0].target.split('-')[0]}
						</Typography>
						{hasStream ? null : (
							<Typography id="transition-modal-description" sx={{ mt: 2, color: 'red' }}>
								Please make sure all the information here is correct!
							</Typography>
						)}
						<Stack spacing={16} direction="row" sx={{ justifyContent: 'center' }}>
							{hasStream ? (
								<StreamActionTooltip title={tooltip} placement="top" arrow>
									<Button variant="contained" disabled={disabled} onClick={startStream}>
										Update
									</Button>
								</StreamActionTooltip>
							) : (
								<StreamActionTooltip title={tooltip} placement="top" arrow>
									<Button variant="contained" disabled={disabled} onClick={startStream}>
										Start
									</Button>
								</StreamActionTooltip>
							)}
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
}
