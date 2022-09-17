import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ButtonNew from 'components/common/ButtonNew';
import styles from './styles.module.scss';

interface IProps {
	handleSetFromToken: (arg: string) => void;
	handleSetToToken: (arg: string) => void;
	ApproveSwapTokens: () => void;
	SwapTokens: () => void;
	handleSetAmountIn: (arg: string) => void;
	handleSetMinAmountOut: (arg: string) => void;
	fromSupertoken: string;
	toSupertoken: string;
	amountIn: string;
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
	handleSetToToken,
	handleSetAmountIn,
	handleSetMinAmountOut,
	fromSupertoken,
	toSupertoken,
	amountIn,
	minAmountOut,
	approved,
	isLoading,
}) => {
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
						From Supertoken
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
						{tokens.map((token, i) => {
							return (
								<option key={`${token.name}-${i}`} value={token.address}>
									{token.name}
								</option>
							);
						})}
					</select>
				</Grid>

				<Grid item xs={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
					<SwapHorizIcon
						style={{
							color: 'white',
						}}
					/>
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
						To Supertoken
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
					<input
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
				</Grid>
				<Grid item xs={12}>
					<label
						style={{
							color: 'white',
							marginBottom: '20px',
						}}
					>
						Minimum Output Amount
					</label>
					<input
						type={'text'}
						value={minAmountOut}
						required
						onChange={async (e) => await handleSetMinAmountOut(e.target.value)}
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
				</Grid>
				<Grid item xs={12}>
					{approved ? (
						<ButtonNew
							color="secondary"
							disabled={isLoading}
							isLoading={isLoading}
							onClick={SwapTokens}
							style={{
								backgroundColor: '#79aad9',
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
