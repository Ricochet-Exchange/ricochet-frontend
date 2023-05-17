import { TextInput } from 'components/common/TextInput';
import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'i18n';
import ReactTooltip from 'react-tooltip';
import ButtonNew from '../../common/ButtonNew';
import { Coin } from '../../../constants/coins';
import styles from './styles.module.scss';
import ToggleButton from 'components/common/Toggle';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// import ToggleButton from '@mui/material/ToggleButton';

interface IProps {
	value: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onClickStart: () => void;
	onClickStop: () => void;
	coin: Coin;
	coinB: Coin;
	isLoading?: boolean;
	isReadOnly?: boolean;
	personalFlow: string;
	shareScaler: number;
	indexVal?: number;
	coinBalanceA?: string;
}
const IOSSwitch = styled((props: SwitchProps) => (
	<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: '#396288',
				opacity: 1,
				border: 0,
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
	},
}));
export const CoinRateForm: FC<IProps> = ({
	value,
	onChange,
	onClickStart,
	onClickStop,
	placeholder,
	coin,
	coinB,
	isLoading,
	isReadOnly,
	personalFlow,
	shareScaler,
	indexVal,
	coinBalanceA,
}) => {
	const { t } = useTranslation();
	const [showLimitOrderSection, setShowLimitOrderSection] = React.useState(false);
	const [limitValue, setLimitValue] = React.useState('');
	const [expiresIn, setExpiresIn] = React.useState('');
	const [customModal, showCustomModal] = React.useState(false);
	const [hours, setHours] = React.useState('');
	const [minutes, setMinutes] = React.useState('');
	const handleDropdownChange = (event: SelectChangeEvent) => {
		setExpiresIn(event.target.value as string);
		if (event.target.value === 'custom') {
			showCustomModal(true);
		}
		console.log('check', event.target.value);
	};
	const handleClose = () => showCustomModal(false);

	const onCustomPeriodClick = () => {
		console.log('buttonClicked');
		showCustomModal(false);
	};
	const handleHoursChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		setHours(event.target.value);
	};
	const handleMinutesChange = () => (event: React.ChangeEvent<HTMLInputElement>) => {
		setMinutes(event.target.value);
	};
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setShowLimitOrderSection(event.target.checked);
	};
	const onLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLimitValue(event.target.value);
	};
	const uuid = new Date().getTime().toString(36) + Math.random().toString(36).slice(2);
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
	// Security Deposit is 4 hours worth of stream, so (4*60*60)/(30*24*60*60) = 1/180
	return (
		<>
			<div className={styles.input_container}>
				<div className={styles.input_wrap}>
					<TextInput
						value={value}
						className={styles.input}
						onChange={onChange}
						containerClassName={styles.container_input}
						placeholder={placeholder}
						right={<div className={styles.right}>{`${coin}x/mo.`}</div>}
						type="number"
					/>
				</div>
				<div className={styles.buttons}>
					<div className={styles.start_wrap}>
						<span data-tip data-for={`depositTooltip-${indexVal}`}>
							<ButtonNew
								loaderColor="white"
								color="primary"
								onClick={onClickStart}
								className={styles.start}
								disabled={
									isReadOnly ||
									isLoading ||
									!Boolean(parseInt(coinBalanceA ?? '') > 0) ||
									!value ||
									((Math.floor(((parseFloat(value) / 2592000) * 1e18) / shareScaler) * shareScaler) /
										1e18) *
										2592000 ===
										0
								}
								isLoading={isLoading}
							>
								{t('Start')}/{t('Edit')}
							</ButtonNew>
						</span>
					</div>

					<div className={styles.stop_wrap}>
						{parseFloat(personalFlow) > 0 && (
							<ButtonNew
								loaderColor="#363B55"
								color="secondary"
								onClick={onClickStop}
								className={styles.stop}
								disabled={isReadOnly || isLoading}
								isLoading={isLoading}
							>
								{t('Stop')}
							</ButtonNew>
						)}
					</div>

					<div style={{ flexBasis: '100%', height: '0' }}> </div>

					{Boolean(parseInt(coinBalanceA ?? '') < parseInt(value)) ? (
						<ReactTooltip
							id={`depositTooltip-${indexVal}`}
							place="right"
							effect="solid"
							multiline
							className={styles.depositTooltip}
						>
							<span className={styles.depositTooltip_span}>No money, deposit in wallet page </span>
						</ReactTooltip>
					) : value && coin && coinBalanceA ? (
						<ReactTooltip
							id={`depositTooltip-${indexVal}`}
							place="right"
							effect="solid"
							multiline
							className={styles.depositTooltip}
						>
							{
								<span className={styles.depositTooltip_span}>
									The amount per month will be rounded off to
									<span style={{ fontWeight: 700 }}>
										{` ${(
											((Math.floor(((parseFloat(value) / 2592000) * 1e18) / shareScaler) *
												shareScaler) /
												1e18) *
											2592000
										).toFixed(6)} ${coin} `}
									</span>
									so the contracts can evenly divide it and it will take a security deposit of
									<span style={{ fontWeight: 700 }}>
										{` ${(parseFloat(value) / 180.0).toFixed(6)} ${coin} `}
									</span>
									from your balance. The Deposit will be refunded in full when you close the stream or
									lost if your balance hits zero with the stream still open.
								</span>
							}
						</ReactTooltip>
					) : null}
					<div />
				</div>
			</div>
			<div className={styles.limit_order_section}>
				<FormControlLabel
					control={
						<IOSSwitch
							sx={{ m: 1 }}
							checked={showLimitOrderSection}
							onChange={handleChange}
							defaultChecked
						/>
					}
					label="limit order"
				/>
				{showLimitOrderSection ? (
					<>
						{' '}
						<div className={styles.limit_order_row}>
							<div className={styles.input_wrap}>
								<TextInput
									value={limitValue}
									className={styles.input}
									onChange={onLimitChange}
									containerClassName={styles.container_input}
									placeholder={'limit price'}
									right={<div className={styles.right}>{`${coin}/${coinB}`}</div>}
									type="number"
								/>
							</div>
							<div className={styles.info_icon}>
								<span>
									<span
										data-tip
										data-for={`depositTooltipTotal-${uuid}`}
										style={{ marginLeft: '6px' }}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 50 50"
											width="18px"
											height="18px"
										>
											<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" />
										</svg>
									</span>
									<ReactTooltip
										id={`depositTooltipTotal-${uuid}`}
										place="right"
										effect="solid"
										multiline
										className={styles.depositTooltip}
									>
										<span className={styles.depositTooltip_span}>
											DCA is stopped when the price falls below this limit price, restarted when
											it crossed back above.
											{/* <br />
										Your rewards: {userRewards} RIC/mo. */}
										</span>
									</ReactTooltip>
								</span>
							</div>
						</div>
						<div className={styles.limit_order_row}>
							<FormControl sx={{ minWidth: 295 }} size="small" variant="filled">
								<InputLabel id="demo-simple-select-label" style={{ color: '' }}>
									Expires In
								</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={expiresIn}
									className={styles.dropdown_input}
									// label="Expires In"
									onChange={handleDropdownChange}
								>
									<MenuItem value={'7'}>7 days</MenuItem>
									<MenuItem value={'30'}>30 days</MenuItem>
									<MenuItem value={'90'}>3 months</MenuItem>
									<MenuItem value={'custom'}>custom</MenuItem>
								</Select>
							</FormControl>
							<div className={styles.info_icon}>
								<span>
									<span
										data-tip
										data-for={`depositTooltipTotal-${uuid}+1`}
										style={{ marginLeft: '6px' }}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 50 50"
											width="18px"
											height="18px"
										>
											<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 25 11 A 3 3 0 0 0 22 14 A 3 3 0 0 0 25 17 A 3 3 0 0 0 28 14 A 3 3 0 0 0 25 11 z M 21 21 L 21 23 L 22 23 L 23 23 L 23 36 L 22 36 L 21 36 L 21 38 L 22 38 L 23 38 L 27 38 L 28 38 L 29 38 L 29 36 L 28 36 L 27 36 L 27 21 L 26 21 L 22 21 L 21 21 z" />
										</svg>
									</span>
									<ReactTooltip
										id={`depositTooltipTotal-${uuid}+1`}
										place="right"
										effect="solid"
										multiline
										className={styles.depositTooltip}
									>
										<span className={styles.depositTooltip_span}>
											Limit order is closed after this time period{' '}
										</span>
									</ReactTooltip>
								</span>
							</div>
						</div>
					</>
				) : null}
			</div>
			{customModal ? (
				<Modal
					open={customModal}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Set up custom period
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Set the custom amount of time before Limit Order expires{' '}
						</Typography>
						<div className={styles.input_wrap} style={{ marginTop: '10px' }}>
							<TextField
								required
								id="standard-required"
								label="Hours"
								defaultValue={hours}
								onChange={handleHoursChange}
								placeholder={'0'}
								type="Number"
								variant="standard"
							/>
						</div>
						<div className={styles.input_wrap}>
							<TextField
								required
								id="standard-required"
								label="Minutes"
								defaultValue={minutes}
								onChange={handleMinutesChange}
								placeholder={'0'}
								type="number"
								variant="standard"
							/>
						</div>
						<Button variant="contained" onClick={onCustomPeriodClick} className={styles.custom_button}>
							{' '}
							{'Set Custom Period'}
						</Button>
					</Box>
				</Modal>
			) : null}
		</>
	);
};
