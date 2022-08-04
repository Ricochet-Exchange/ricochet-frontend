import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Token } from '@uniswap/sdk-core';
import React, { FC } from 'react';
import { superTokenList } from 'utils/getUnderlyingToken';
import styles from './styles.module.scss';

interface IProps {
	inputSuperToken: string;
	outputSuperToken: string;
	setInputSuperToken: (inputToken: string) => void;
	setOutputSuperToken: (outputToken: string) => void;
	setInputAmount: (inputAmount: string) => void;
	setOutputAmount: (outputAmount: string) => void;
	handleSwap: () => void;
	inputAmount: string;
	outputAmount: string;
	handleApprove: () => void;
}

export const SwapModal: FC<IProps> = ({
	inputSuperToken,
	outputSuperToken,
	setInputSuperToken,
	setOutputSuperToken,
	inputAmount,
	outputAmount,
	setInputAmount,
	setOutputAmount,
	handleSwap,
	handleApprove,
}) => {
	console.log(Object.keys(superTokenList));
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<TextField
					id="outlined-basic"
					className={styles.individual}
					label="Amount"
					variant="outlined"
					value={inputAmount}
					onChange={(e) => setInputAmount(e.target.value)}
				/>
				<FormControl fullWidth>
					<InputLabel variant="standard" htmlFor="input-supertoken-select">
						From Token
					</InputLabel>
					<Select
						value={inputSuperToken}
						className={styles.individual}
						onChange={(e) => setInputSuperToken(e.target.value)}
					>
						{Object.keys(superTokenList).map((token) => (
							<MenuItem value={token}>{token}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className={styles.row}>
				<TextField
					id="outlined-basic"
					label="Amount"
					variant="outlined"
					value={outputAmount}
					onChange={(e) => setOutputAmount(e.target.value)}
					className={styles.individual}
				/>
				<FormControl fullWidth>
					<InputLabel variant="standard" className={styles.individual} htmlFor="input-supertoken-select">
						To Token
					</InputLabel>
					<Select
						value={outputSuperToken}
						className={styles.individual}
						onChange={(e) => setOutputSuperToken(e.target.value)}
					>
						{Object.keys(superTokenList).map((token) => (
							<MenuItem value={token}>{token}</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
			<div className={styles.row}>
				<Button
					onClick={async () => {
						await handleSwap();
					}}
				>
					Swap
				</Button>
				<Button
					onClick={async () => {
						await handleApprove();
					}}
				>
					APPROVE
				</Button>
			</div>
		</div>
	);
};
