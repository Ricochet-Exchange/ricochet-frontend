import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ButtonNew from 'components/common/ButtonNew';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import styles from './styles.module.scss';

interface IProps {
	handleSetFromToken: (arg: string) => void;
	handleSetToToken: (arg: string) => void;
	ApproveSwapTokens: () => void;
	SwapTokens: () => void;
	handleSetAmountIn: (arg: string) => void;
	handleSetMinAmountOut: (arg: string) => void;
	handleSetSlippageTolerance: (arg: string) => void;
	fromSupertoken: string;
	toSupertoken: string;
	amountIn: string;
	toName: string;
	toSymbol: string;
	minAmountOut: string;
	tokens: { name: string; address: string; underlyingToken: string }[];
	approved: boolean;
	isLoading: boolean;
}

export const SwapForm: React.FC<IProps> = ({
	tokens,
	ApproveSwapTokens,
	SwapTokens,
	handleSetFromToken,
	handleSetSlippageTolerance,
	handleSetToToken,
	handleSetAmountIn,
	fromSupertoken,
	amountIn,
	toName,
	minAmountOut,
	approved,
	isLoading,
}) => {
	const { balances } = useShallowSelector(selectMain);

	const handleSetMaxIn = () => {
		if (balances === undefined) {
			return;
		}
		let amountMaxIn = +balances[fromSupertoken];
		handleSetAmountIn(`${amountMaxIn}`);
	};

	return (
		<React.Fragment>
			<Grid
				container
				spacing={3}
				style={{
					backgroundColor: '#2d3233',
				}}
			>
				<Grid item xs={12} sm={12}>
					<Typography
						variant="h6"
						gutterBottom
						style={{
							color: 'white',
							fontSize: 'larger',
						}}
					>
						From token
					</Typography>
					<select
						name="SuperTokens"
						id="supertoken"
						onChange={async (e) => await handleSetFromToken(e.target.value)}
						className={styles.select}
						style={{
							color: 'lightgray',
							backgroundColor: '#2b2b2b',
							border: 'none',
							fontSize: 'large',
							paddingLeft: '1em',
						}}
					>
						<option value={''}>Choose a Token</option>

						{balances
							? tokens.map((token, i) => {
									if (token.name === 'RIC') {
										console.log('RIC');
										return;
									}
									if (+balances[token.address] > 0) {
										return (
											<option
												key={`${token.name}-${i}`}
												value={token.address}
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'space-between',
													width: '100%',
												}}
											>
												{token.name}
												{'     --    balance:  '}
												{(+balances[token.address]).toFixed(8)}
											</option>
										);
									} else {
										return (
											<option
												key={`${token.name}-${i}`}
												value={token.address}
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'space-between',
													width: '100%',
												}}
											>
												{token.name}
												{'     --    balance:  '}
												{(+balances[token.address]).toFixed(2)}
											</option>
										);
									}
							  })
							: ''}
					</select>
				</Grid>

				<Grid item xs={12} sm={12}>
					<Typography
						variant="h6"
						gutterBottom
						style={{
							color: 'white',
							fontSize: 'larger',
						}}
					>
						To token
					</Typography>
					<select
						name="SuperTokens"
						id="supertoken"
						onChange={async (e) => await handleSetToToken(e.target.value)}
						className={styles.select}
						style={{
							color: 'lightgray',
							backgroundColor: '#2b2b2b',
							border: 'none',
							fontSize: 'large',
							paddingLeft: '1em',
						}}
					>
						<option value={''}>Choose a Token</option>
						{tokens.map((token, i) => {
							if (token.name === 'RIC') {
								console.log('RIC');
								return;
							}
							return (
								<option key={`${token.name}-${i}`} value={token.address}>
									{token.name}
								</option>
							);
						})}
					</select>
				</Grid>

				<Grid item xs={12}>
					<label
						style={{
							color: 'white',
							marginBottom: '20px',
						}}
					>
						Input Amount
					</label>
					<div
						style={{
							height: '6vh',
							width: '100%',
							display: 'flex',
							flexDirection: 'row',
							marginTop: '0.5em',
						}}
					>
						<input
							placeholder="0.00"
							required
							value={amountIn}
							onChange={async (e) => await handleSetAmountIn(e.target.value)}
							style={{
								color: 'white',
								backgroundColor: '#2b2b2b',
								width: '100%',
								height: '6vh',
								paddingLeft: '1em',
								border: 'none',
								fontSize: 'large',
							}}
						/>
						<button
							style={{
								height: '6vh',
								width: '20%',
								marginLeft: '1em',
								backgroundColor: fromSupertoken !== '' ? '#79aad9' : 'lightgray',
								color: '#303030',
							}}
							disabled={fromSupertoken !== '' ? false : true}
							onClick={handleSetMaxIn}
						>
							Max
						</button>
					</div>
				</Grid>
				<Grid item xs={12}>
					<div className={styles.outputAmount}>
						<h5>Minimum Output Amount:</h5>
						<h5>
							{minAmountOut} - {toName}
						</h5>
					</div>
					<select
						name="slippage"
						id="supertoken"
						onChange={async (e) => await handleSetSlippageTolerance(e.target.value)}
						className={styles.select}
						style={{
							color: 'lightgray',
							backgroundColor: '#2b2b2b',
							border: 'none',
							fontSize: 'large',
							paddingLeft: '1em',
						}}
					>
						<option value={'0.02'}>Choose Slippage tolerance: default 2%</option>
						<option value={'0.01'}>1%</option>
						<option value={'0.02'}>2%</option>
						<option value={'0.03'}>3%</option>
					</select>
				</Grid>
				<Grid item xs={12}>
					{approved ? (
						<ButtonNew
							color="secondary"
							disabled={isLoading}
							isLoading={isLoading}
							onClick={SwapTokens}
							style={{
								backgroundColor: '#79bbd9',
								fontWeight: 'bold',
								color: '#303030',
							}}
						>
							Swap Tokens
						</ButtonNew>
					) : (
						<ButtonNew
							color="secondary"
							disabled={isLoading}
							isLoading={isLoading}
							onClick={ApproveSwapTokens}
							style={{
								backgroundColor: '#79aad9',
								fontWeight: 'bold',
								color: '#303030',
							}}
						>
							Approve Tokens
						</ButtonNew>
					)}
				</Grid>
			</Grid>
		</React.Fragment>
	);
};
