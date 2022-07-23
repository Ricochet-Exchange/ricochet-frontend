import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Token } from '@uniswap/sdk-core';
import React, { FC } from 'react';
import { tokenList } from 'utils/getUnderlyingToken';
import styles from './styles.module.scss';

interface IProps {
	inputToken: string;
	outputToken: string;
	setInputToken: (inputToken: string) => void;
	setOutputToken: (outputToken: string) => void;
	setInputAmount: (inputAmount: string) => void;
	setOutputAmount: (outputAmount: string) => void;
}

export const SwapModal: FC<IProps> = ({
	inputToken,
	outputToken,
	setInputToken,
	setOutputToken,
	setInputAmount,
	setOutputAmount,
}) => {
	console.log(Object.keys(tokenList));
	return (
		<div className={styles.container}>
			<div className={styles.row}>
				<TextField id="outlined-basic" className={styles.individual} label="Outlined" variant="outlined" />
				<FormControl fullWidth>
					<InputLabel variant="standard" htmlFor="input-supertoken-select">
						From Token
					</InputLabel>
					<Select value={inputToken} className={styles.individual} onChange={(e) => setInputToken(e.target.value)}>
						{Object.keys(tokenList).forEach((token: string) => {
							<MenuItem value={tokenList[token].address}>{token}</MenuItem>;
						})}{' '}
					</Select>
				</FormControl>
			</div>
			<div className={styles.row}>
				<TextField id="outlined-basic" label="Outlined" variant="outlined" className={styles.individual} />
				<FormControl fullWidth>
					<InputLabel variant="standard" className={styles.individual} htmlFor="input-supertoken-select">
						To Token
					</InputLabel>
					<Select value={outputToken} className={styles.individual} onChange={(e) => setOutputToken(e.target.value)}>
						{Object.keys(tokenList).forEach((token: string) => {
							<MenuItem value={tokenList[token].address}>{token}</MenuItem>;
						})}{' '}
					</Select>
				</FormControl>
			</div>
      <div className={styles.row}>
        <Button>
          Swap
        </Button>
      </div>
		</div>
	);
};
