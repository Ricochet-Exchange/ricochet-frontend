import React from 'react';
import dayjs from 'dayjs';
import type { ColumnName, Data } from './types';

type ContentProps = {
	id: ColumnName;
	row: Data;
};

export function Content({ id, row }: ContentProps) {
	let content;

	switch (id) {
		case 'startDate':
			content = dayjs(Number(row.startDate)).format('DD/MM/YY');
			break;

		case 'endDate':
			content = dayjs(Number(row.endDate)).format('DD/MM/YY');
			break;

		case 'Input':
			content = `${row.input.tokenAmount.toFixed(6)} ${row.input.coin} ($${row.input.usdAmount.toFixed(4)})`;
			break;

		case 'Output':
			content = `${row.output.tokenAmount.toFixed(6)} ${row.output.coin} ($${row.output.usdAmount.toFixed(4)})`;
			break;

		case 'PnL':
			content = `${row.pnl.amount.toFixed(4)} (${row.pnl.percent.toFixed(2)}%)`;
			break;

		default:
			content = 'not found';
			break;
	}

	return <span>{content}</span>;
}
