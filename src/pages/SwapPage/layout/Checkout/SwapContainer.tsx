import * as React from 'react';
import { gas } from 'api/gasEstimator';
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

import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { swap } from 'utils/swap/swap';
import { superTokenABI } from 'constants/abis';
import { SwapForm } from './SwapForm';
import { SwapContract } from 'constants/contracts';

export default function SwapContainer() {
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
	const [loading, setLoading] = React.useState(false);
	const [fromSupertoken, setFromSupertoken] = React.useState('');
	const [fromSymbol, setFromSymbol] = React.useState('');
	const [toSupertoken, setToSupertoken] = React.useState('');
	const [toSymbol, setToSymbol] = React.useState('');
	const [underlyingToken1, setUnderlyingToken1] = React.useState('');
	const [underlyingToken2, setUnderlyingToken2] = React.useState('');
	const [amountIn, setAmountIn] = React.useState('');
	const [minAmountOut, setMinAmountOut] = React.useState('');
	const [approved, setApprove] = React.useState(false);
	const [success, setSuccess] = React.useState(false);
	const [tx, setTx] = React.useState('');

	const handleSetFromToken = (value: any) => {
		let fromToken = tokens.filter((token) => token.address == value);
		let symbol = fromToken[0].name;
		let underlying = fromToken[0].underlyingToken;

		setFromSupertoken(value);
		setFromSymbol(symbol);
		setUnderlyingToken1(underlying);
	};

	const handleSetToToken = (value: any) => {
		let fromToken = tokens.filter((token) => token.address == value);
		let symbol = fromToken[0].name;
		let underlying = fromToken[0].underlyingToken;

		setToSupertoken(value);
		setToSymbol(symbol);
		setUnderlyingToken2(underlying);
	};

	const SwapTokens = React.useCallback(async () => {
		let hasUnderlyingFrom;
		let hasUnderlyingTo;

		if (underlyingToken1 === fromSupertoken) {
			hasUnderlyingFrom = false;
		} else {
			hasUnderlyingFrom = true;
		}
		if (underlyingToken2 === toSupertoken) {
			hasUnderlyingTo = false;
		} else {
			hasUnderlyingTo = true;
		}

		setLoading(true);

		let bigNumAmountIn;
		let bigNumMinAmountOut;
		let path = [underlyingToken1, underlyingToken2];

		bigNumAmountIn = await Web3.utils.toWei(amountIn, 'ether');
		bigNumMinAmountOut = await Web3.utils.toWei(minAmountOut, 'ether');

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
			).then((res) => {
				console.log(res);
				setLoading(false);
				setSuccess(true);
				setTx(res.transactionHash);
			});
		} catch (e) {
			console.log(e);
			setLoading(false);
		}
	}, [fromSupertoken, toSupertoken, web3, address, amountIn, minAmountOut]);

	const ApproveSwapTokens = React.useCallback(async () => {
		let web3ToUse;
		if (!web3.currentProvider || fromSupertoken === '') {
			console.log(fromSupertoken);
			console.log('fail');
			return;
		}
		setLoading(true);
		web3.eth.handleRevert = true;
		web3ToUse = web3;
		console.log(fromSupertoken);
		const contract = await new web3ToUse.eth.Contract(superTokenABI as any, fromSupertoken);

		let bigNumAmountIn = await web3.utils.toWei(amountIn, 'ether');
		let swapContract = await web3.utils.toChecksumAddress(SwapContract);

		contract.methods
			.approve(swapContract, bigNumAmountIn)
			.send({
				from: address,
				...(await gas()),
			})
			.then((res: any) => {
				console.log(res);
				setApprove(true);
				setLoading(false);
			})
			.catch((error: any) => {
				setLoading(false);
				console.log(error);
			});
	}, [amountIn, fromSupertoken, address]);

	const handleSetAmountIn = (value: string) => {
		setAmountIn(value);
	};

	const handleSetMinAmountOut = (value: string) => {
		setMinAmountOut(value);
	};

	return (
		<div>
			{success ? (
				<div
					style={{
						color: 'white',
					}}
				>
					Your swap of:
					<br />
					<br />
					From Token: {fromSupertoken}
					<br />
					<br />
					To Token: {toSupertoken}
					<br />
					<br />
					Amount In: {amountIn}
					<br />
					<br />
					minAmountOut: {minAmountOut}
					<br />
					<br />
					Was successful. Your transaction link:
					<br />
					<a style={{ color: 'lightblue' }} href={`https://polygonscan.com/tx/${tx}`} target={'blank'}>
						View transaction
					</a>
				</div>
			) : (
				<SwapForm
					tokens={tokens}
					ApproveSwapTokens={ApproveSwapTokens}
					SwapTokens={SwapTokens}
					handleSetFromToken={handleSetFromToken}
					handleSetToToken={handleSetToToken}
					handleSetAmountIn={handleSetAmountIn}
					handleSetMinAmountOut={handleSetMinAmountOut}
					fromSupertoken={fromSupertoken}
					toSupertoken={toSupertoken}
					amountIn={amountIn}
					minAmountOut={minAmountOut}
					approved={approved}
					isLoading={loading}
				/>
			)}
		</div>
	);
}
