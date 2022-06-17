import { Coin } from 'constants/coins';

export type ColumnName = 'startDate' | 'endDate' | 'Input' | 'Output' | 'PnL';

export interface Column {
	id: ColumnName;
	label: string;
	minWidth?: number;
	align?: 'right' | 'left';
	tooltip?: string;
	format?: (value: number) => string;
}

export interface Data {
	startDate: number;
	endDate: number;
	input: {
		coin: Coin;
		tokenAmount: number;
		usdAmount: number;
		txn: string;
	};
	output: {
		coin: Coin;
		tokenAmount: number;
		usdAmount: number;
		txn: string;
	};
	pnl: {
		// (USD amount out - USD amount in)
		amount: number;
		// (USD amount out - USD amount in) / USD amount in
		percent: number;
	};
	updatedAtBlockNumber: number;
}
