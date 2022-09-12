import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Web3 from 'web3';
import {
	DAIxAddress,
	USDCxAddress,
	RICAddress,
	MATICxAddress,
	MKRxAddress,
	WETHxAddress,
	WBTCxAddress,
	SUSHIxAddress,
	IDLExAddress,
	DAIAddress,
	USDCAddress,
	WMATICAddress,
	MKRAddress,
	WETHAddress,
	WBTCAddress,
	SUSHIAddress,
	IDLEAddress,
} from 'constants/polygon_config';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Button, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { swap } from 'utils/swap/swap';

export default function SwapForm() {
	const tokens = [
		{
			name: 'MATICx',
			address: MATICxAddress,
			underlyingToken: WMATICAddress,
		},
		{
			name: 'MKRx',
			address: MKRxAddress,
			underlyingToken: MKRAddress,
		},
		{
			name: 'WETHx',
			address: WETHxAddress,
			underlyingToken: WETHAddress,
		},
		{
			name: 'WBTCx',
			address: WBTCxAddress,
			underlyingToken: WBTCAddress,
		},
		{
			name: 'USDCx',
			address: USDCxAddress,
			underlyingToken: USDCAddress,
		},
		{
			name: 'DAIx',
			address: DAIxAddress,
			underlyingToken: DAIAddress,
		},
		{
			name: 'SUSHIx',
			address: SUSHIxAddress,
			underlyingToken: SUSHIAddress,
		},
		{
			name: 'IDLEx',
			address: IDLExAddress,
			underlyingToken: IDLEAddress,
		},
		{
			name: 'RIC',
			address: RICAddress,
			underlyingToken: RICAddress,
		},
	];

	const { address, web3 } = useShallowSelector(selectMain);
	const [fromSupertoken, setFromSupertoken] = React.useState('');
	const [fromSymbol, setFromSymbol] = React.useState('');
	const [toSupertoken, setToSupertoken] = React.useState('');
	const [underlyingToken1, setUnderlyingToken1] = React.useState('');
	const [underlyingToken2, setUnderlyingToken2] = React.useState('');
	const [amountIn, setAmountIn] = React.useState('');
	const [minAmountOut, setMinAmountOut] = React.useState('');
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const SwapTokens = () => {
		let bigNumAmountIn;
		let bigNumMinAmountOut;
		let path = [underlyingToken1, underlyingToken2];

		bigNumAmountIn = Web3.utils.toWei(amountIn, 'ether');
		bigNumMinAmountOut = Web3.utils.toWei(minAmountOut, 'ether');
		console.log(bigNumAmountIn, bigNumMinAmountOut);
		console.log({
			_from: fromSupertoken,
			_to: toSupertoken,
			amountIn: bigNumAmountIn,
			amountOutMin: bigNumMinAmountOut,
			path: path,
			poolFees: ['500'],
			_hasUnderlyingFrom: true,
			_hasUnderlyingTo: true,
		});
		try {
			swap(
				{
					_from: fromSupertoken,
					_to: toSupertoken,
					amountIn: bigNumAmountIn,
					amountOutMin: bigNumMinAmountOut,
					path: path,
					poolFees: ['500'],
					_hasUnderlyingFrom: true,
					_hasUnderlyingTo: true,
				},
				web3,
				address,
			);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<React.Fragment>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={12}>
					<Typography variant="h6" gutterBottom>
						From Supertoken
					</Typography>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={fromSupertoken[0]}
						onChange={(e) => {
							setFromSupertoken(e.target.value[0]);
							setUnderlyingToken1(e.target.value[1]);
						}}
						fullWidth
					>
						{tokens.map((token, i) => {
							return (
								<MenuItem
									id={`${token.name}-${i}`}
									value={[`${token.address}`, `${token.underlyingToken}`]}
								>
									{token.name}
								</MenuItem>
							);
						})}
					</Select>
				</Grid>

				<Grid item xs={12} sm={12}>
					<Typography variant="h6" gutterBottom>
						To Supertoken
					</Typography>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={toSupertoken[0]}
						label="Age"
						onChange={(e) => {
							setToSupertoken(e.target.value[0]);
							setUnderlyingToken2(e.target.value[1]);
						}}
						fullWidth
					>
						{tokens.map((token, i) => {
							return (
								<MenuItem id={`${token.name}-${i}`} value={[token.address, token.underlyingToken]}>
									{token.name}
								</MenuItem>
							);
						})}
					</Select>
				</Grid>
				<Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<SwapHorizIcon />
				</Grid>
				<Grid item xs={12}>
					<TextField
						required
						id="address1"
						name="address1"
						label="Amount to swap"
						fullWidth
						autoComplete="shipping address-line1"
						variant="standard"
						value={amountIn}
						onChange={(e) => setAmountIn(e.target.value)}
						color="secondary"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="address2"
						name="address2"
						label="Minimum Amount Swapped"
						fullWidth
						autoComplete="shipping address-line2"
						value={minAmountOut}
						onChange={(e) => setMinAmountOut(e.target.value)}
						variant="standard"
					/>
				</Grid>
				<Grid item xs={12}>
					<Button onClick={() => SwapTokens()}>Swap</Button>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
