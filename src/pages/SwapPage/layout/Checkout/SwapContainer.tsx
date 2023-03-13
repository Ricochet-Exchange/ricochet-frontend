import * as React from 'react';
import { gas } from 'api/gasEstimator';
import Web3 from 'web3';
import {
	DAIxAddress,
	USDCxAddress,
	RICAddress,
	MATICxAddress,
	WETHxAddress,
	WBTCxAddress,
	DAIAddress,
	USDCAddress,
	WMATICAddress,
	WETHAddress,
	WBTCAddress,
} from 'constants/polygon_config';
import axios from 'axios';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { swap } from 'utils/swap/swap';
import { superTokenABI } from 'constants/ABIs/supertoken';
import { SwapForm } from './SwapForm';
import { SwapContract } from 'constants/contracts';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import styles from './styles.module.scss';

export default function SwapContainer() {
	const tokens = [
		{
			name: 'MATICx',
			symbol: 'matic-network',
			address: MATICxAddress,
			underlyingToken: WMATICAddress,
		},
		{
			name: 'WETHx',
			symbol: 'ethereum',
			address: WETHxAddress,
			underlyingToken: WETHAddress,
		},
		{
			name: 'WBTCx',
			symbol: 'wrapped-bitcoin',
			address: WBTCxAddress,
			underlyingToken: WBTCAddress,
		},
		{
			name: 'USDCx',
			symbol: 'usd-coin',
			address: USDCxAddress,
			underlyingToken: USDCAddress,
		},
		{
			name: 'DAIx',
			symbol: 'dai',
			address: DAIxAddress,
			underlyingToken: DAIAddress,
		},
		{
			name: 'RIC',
			symbol: 'ric',
			address: RICAddress,
			underlyingToken: RICAddress,
		},
	];

	const { address, web3 } = useShallowSelector(selectMain);
	const [loading, setLoading] = React.useState(false);
	const [fromSupertoken, setFromSupertoken] = React.useState('');
	const [fromSymbol, setFromSymbol] = React.useState('');
	const [toSupertoken, setToSupertoken] = React.useState('');
	const [geckoPriceList, setGeckoPriceList] = React.useState<{}>();
	const [toSymbol, setToSymbol] = React.useState('');
	const [underlyingToken1, setUnderlyingToken1] = React.useState('');
	const [underlyingToken2, setUnderlyingToken2] = React.useState('');
	const [amountIn, setAmountIn] = React.useState('');
	const [minAmountOut, setMinAmountOut] = React.useState('');
	const [approved, setApprove] = React.useState(false);
	const [success, setSuccess] = React.useState(0);
	const [slippageTolerance, setSlippageTolerance] = React.useState('0.02');
	const [toTokenName, setToTokenName] = React.useState('');
	const [tx, setTx] = React.useState('');

	const coingeckoUrl =
		'https://api.coingecko.com/api/v3/simple/price?ids=richochet%2Cusd-coin%2Cdai%2Cmaker%2Cethereum%2Cwrapped-bitcoin%2Cidle%2Cmatic-network%2Csushi&vs_currencies=usd';

	React.useEffect(() => {
		axios
			.get(coingeckoUrl)
			.then((response) => {
				setGeckoPriceList(response.data);
			})
			.catch((error: any) => {
				console.log('error', error);
				return;
			});
	}, []);

	React.useEffect(() => {
		if (amountIn !== '' && fromSymbol !== '' && toSymbol !== '' && geckoPriceList) {
			let pricesArray = [];
			let keys = Object.keys(geckoPriceList);
			let values = Object.values(geckoPriceList);

			for (let i = 0; i < keys.length; i++) {
				pricesArray.push([keys[i], values[i]]);
			}
			let fromSymbolPrice = pricesArray.filter((pair) => pair[0] === fromSymbol);
			console.log(fromSymbolPrice);
			let price = fromSymbolPrice[0][1];
			// @ts-ignore
			price = price.usd;
			// @ts-ignore
			let priceAmountIn = price * amountIn;
			console.log('price of ', priceAmountIn);

			let toSymbolPrice = pricesArray.filter((pair) => pair[0] === toSymbol);
			let toPrice = toSymbolPrice[0][1];
			// @ts-ignore
			toPrice = toPrice.usd;
			// @ts-ignore
			let outPutPrice = priceAmountIn / toPrice;
			let fee = +slippageTolerance;
			let outputFee = outPutPrice * fee;
			let FinalOutputAmount = outPutPrice - outputFee;

			setMinAmountOut(FinalOutputAmount.toFixed(6));
		} else {
			return;
		}
	}, [amountIn, fromSymbol, toSymbol, slippageTolerance, geckoPriceList]);

	const handleSetFromToken = (value: any) => {
		let fromToken = tokens.filter((token) => token.address === value);
		let symbol = fromToken[0].symbol;
		let underlying = fromToken[0].underlyingToken;

		setFromSupertoken(value);
		setFromSymbol(symbol);
		setUnderlyingToken1(underlying);
	};

	const handleSetToToken = (value: any) => {
		let fromToken = tokens.filter((token) => token.address === value);
		let symbol = fromToken[0].symbol;
		let underlying = fromToken[0].underlyingToken;
		let name = fromToken[0].name;

		setToSupertoken(value);
		setToSymbol(symbol);
		setUnderlyingToken2(underlying);
		setToTokenName(name);
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

		if (toTokenName === 'WBTCx') {
			bigNumMinAmountOut = +minAmountOut * 10 ** 8;
		} else if (toTokenName === 'USDCx') {
			bigNumMinAmountOut = +minAmountOut * 10 ** 6;
		} else {
			bigNumMinAmountOut = await Web3.utils.toWei(minAmountOut, 'ether');
		}
		console.log(bigNumMinAmountOut, 'this is big num amount out');
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
			)
				.then((res) => {
					if (res === undefined) {
						setSuccess(2);
						setLoading(false);
						return;
					}
					setLoading(false);
					setSuccess(1);
					setTx(res.transactionHash);
				})
				.catch((error: string) => console.log(error));
		} catch (e) {
			setSuccess(0);
			console.log(e);
			setLoading(false);
		}
	}, [fromSupertoken, toSupertoken, web3, address, amountIn, minAmountOut, slippageTolerance]);

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
	}, [amountIn, fromSupertoken, address, slippageTolerance]);

	const handleSetAmountIn = (value: string) => {
		setAmountIn(value);
	};

	const handleSetMinAmountOut = (value: string) => {
		setMinAmountOut(value);
	};

	const handleSetSlippageTolerance = (value: string) => {
		setSlippageTolerance(value);
	};

	return (
		<div>
			{success === 1 ? (
				<div
					style={{
						color: 'white',
					}}
				>
					Your swap of:
					<br />
					<br />
					From Token: {fromSymbol}
					<br />
					<br />
					To Token: {toSymbol}
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
					<br />
					<br />
					<button
						style={{
							backgroundColor: '#678eb5',
							color: 'white',
							border: 'none',
							borderRadius: '12px',
							padding: '1em',
							cursor: 'pointer',
						}}
						onClick={() => setSuccess(0)}
					>
						Return
					</button>
				</div>
			) : success === 0 ? (
				<SwapForm
					tokens={tokens}
					ApproveSwapTokens={ApproveSwapTokens}
					SwapTokens={SwapTokens}
					handleSetFromToken={handleSetFromToken}
					handleSetToToken={handleSetToToken}
					handleSetAmountIn={handleSetAmountIn}
					handleSetMinAmountOut={handleSetMinAmountOut}
					handleSetSlippageTolerance={handleSetSlippageTolerance}
					fromSupertoken={fromSupertoken}
					toSupertoken={toSupertoken}
					amountIn={amountIn}
					toName={toTokenName}
					toSymbol={toSymbol}
					minAmountOut={minAmountOut}
					approved={approved}
					isLoading={loading}
				/>
			) : success === 2 ? (
				<div className={styles.fail_wrapper}>
					<h3 style={{ color: 'darkred' }}>We failed to Swap your tokens.</h3>
					<FontIcon name={FontIconName.Close} size={26} />
					<p style={{ color: 'white' }}>Please check your inputs and try again.</p>
					<button
						style={{
							backgroundColor: '#678eb5',
							color: 'white',
							border: 'none',
							borderRadius: '12px',
							padding: '1em',
							cursor: 'pointer',
						}}
						onClick={() => setSuccess(0)}
					>
						Try again
					</button>
				</div>
			) : (
				''
			)}
		</div>
	);
}
