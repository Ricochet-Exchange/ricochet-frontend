import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import type { Column } from './types';
import type { Order } from './TradeHistory';
import { CustomTableCell } from './CustomTableCell';

type EnhancedTableHeadProps = {
	columns: Column[];
	onRequestSort: (event: React.MouseEvent<unknown>, property: 'startDate' | 'endDate') => void;
	order: Order;
	orderBy: string;
};

export function EnhancedTableHead(props: EnhancedTableHeadProps) {
	const { columns, onRequestSort, order, orderBy } = props;
	const createSortHandler = (property: 'startDate' | 'endDate') => (event: React.MouseEvent<unknown>) => {
		onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow>
				{columns.map((column) => (
					<TableCell
						key={column.id}
						align={column.align}
						style={{ minWidth: column.minWidth }}
						sortDirection={orderBy === column.id ? order : false}
					>
						<CustomTableCell
							column={column}
							order={order}
							orderBy={orderBy}
							createSortHandler={createSortHandler}
						/>
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
