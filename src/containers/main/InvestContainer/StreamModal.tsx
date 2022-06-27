import React, { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FlowTypes, InvestmentFlow } from 'constants/flowConfig';
import Web3 from 'web3';
import { getShareScaler } from 'utils/getShareScaler';
import { ExchangeKeys } from 'utils/getExchangeAddress';
import { showErrorToast, showToast } from 'components/common/Toaster';
import { AFFILIATE_STATUS, getAffiliateStatus } from 'utils/getAffiliateStatus';
import { getContract } from 'utils/getContract';
import { rexReferralAddress } from 'constants/polygon_config';
import { referralABI } from 'constants/abis';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

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

type StreamModalProps = {
	open: boolean;
	handleClose: any;
	hasStream: boolean;
	balance: string;
	amount: string;
	setAmount: Dispatch<SetStateAction<string>>;
	coinA: string;
	coinB: string;
	web3: Web3;
	flowType: FlowTypes;
	flow: Pick<InvestmentFlow, 'tokenA' | 'tokenB' | 'flowKey'>;
	flowRate: string;
	isReadOnly: boolean;
	onClickStart: (amount: string, callback: (e?: string) => void) => void;
	account: string;
};

export const StreamModal: FC<StreamModalProps> = ({
	open,
	handleClose,
	hasStream,
	balance,
	amount,
	setAmount,
	coinA,
	coinB,
	web3,
	flowType,
	flow,
	isReadOnly,
	onClickStart,
	flowRate,
	account,
}) => {
	const [isLoading, setIsLoading] = useState(false);
	const [shareScaler, setShareScaler] = useState(1e3);

	const [isAffiliate, setIsAffiliate] = useState(false);

	const contract = getContract(rexReferralAddress, referralABI, web3);

	useEffect(() => {
		let isMounted = true;

		if (web3?.currentProvider === null || flowType !== FlowTypes.market) return;
		const { flowKey, tokenA, tokenB } = flow;
		const exchangeKey = flowKey.replace('FlowQuery', '') as ExchangeKeys;
		getShareScaler(web3, exchangeKey, tokenA, tokenB).then((res) => {
			if (isMounted) {
				setShareScaler(res);
			}
		});
		return () => {
			isMounted = false;
		};
	}, [web3, flowType, flow]);

	useEffect(() => {
		let isMounted = true;

		if (account && contract) {
			(async () => {
				const affiliateStatus = await getAffiliateStatus(contract, account, web3);

				if (isMounted && affiliateStatus === AFFILIATE_STATUS.ENABLED) {
					setIsAffiliate(true);
				}
			})();
		}

		return () => {
			isMounted = false;
		};
	}, [account, contract, web3]);

	useEffect(() => {
		if (flowRate) setAmount(flowRate);
	}, [setAmount, flowRate]);

	const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
		const val = Number(evt.target.value);
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
		if (
			Number(balance) <= 0 ||
			Number(amount) <= 0 ||
			((Math.floor(((parseFloat(amount) / 2592000) * 1e18) / shareScaler) * shareScaler) / 1e18) * 2592000 === 0
		) {
			return;
		}
		setIsLoading(true);
		showToast('Waiting your wallet confirmation...');

		const callback = (e?: string) => {
			if (e) {
				showErrorToast(e, 'Error');
			} else {
				showToast(!flowRate ? 'Streaming started!' : 'the stream has been updated successfully!');
			}
			setIsLoading(false);
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
	}, [amount, balance, flowRate, flowType, handleClose, isAffiliate, onClickStart, shareScaler]);

	const tooltip = (
		<span style={{ fontSize: 16 }}>
			The amount per month will be rounded off to{' '}
			<span style={{ fontWeight: 700 }}>
				{(
					((Math.floor(((parseFloat(amount) / 2592000) * 1e18) / shareScaler) * shareScaler) / 1e18) *
					2592000
				).toFixed(6)}{' '}
				{coinA}
			</span>{' '}
			so the contracts can evenly divide it and it will take a security deposit of{' '}
			<span style={{ fontWeight: 700 }}>
				{(parseFloat(amount) / 180.0).toFixed(6)} {coinA}
			</span>{' '}
			from your balance. The Deposit will be refunded in full when you close the stream or lost if your balance
			hits zero with the stream still open.
		</span>
	);

	const disabled =
		isReadOnly ||
		isLoading ||
		!amount ||
		((Math.floor(((parseFloat(amount) / 2592000) * 1e18) / shareScaler) * shareScaler) / 1e18) * 2592000 === 0;

	return (
		<div>
			<Modal
				aria-labelledby="streaming-modal"
				aria-describedby="start-edit-or-stop-stream"
				open={open}
				onClose={handleClose}
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
								onClick={(evt) => {
									evt.preventDefault();
								}}
							/>
						</Box>
						<Typography color="#2775ca" fontWeight="bold" fontSize={24}>
							{coinA}
						</Typography>
						<Typography>per month into</Typography>
						<Typography color="#2775ca" fontWeight="bold" fontSize={24}>
							{coinB}
						</Typography>
						<Stack spacing={16} direction="row" sx={{ justifyContent: 'center' }}>
							{hasStream ? (
								<StreamActionTooltip title={tooltip} placement="top" arrow>
									<span>
										<LoadingButton
											variant="contained"
											loading={isLoading}
											disabled={disabled}
											onClick={startStream}
										>
											Update
										</LoadingButton>
									</span>
								</StreamActionTooltip>
							) : (
								<StreamActionTooltip title={tooltip} placement="top" arrow>
									<span>
										<LoadingButton
											variant="contained"
											loading={isLoading}
											disabled={disabled}
											onClick={startStream}
										>
											Start
										</LoadingButton>
									</span>
								</StreamActionTooltip>
							)}
						</Stack>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};
