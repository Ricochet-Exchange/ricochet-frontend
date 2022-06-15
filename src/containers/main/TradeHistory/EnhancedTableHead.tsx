import React from 'react';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { visuallyHidden } from '@mui/utils';
import type { Column } from './types';
import type { Order } from './TradeHistory';

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
						{column.id === 'startDate' || column.id === 'endDate' ? (
							<TableSortLabel
								active={orderBy === column.id}
								direction={orderBy === column.id ? order : 'asc'}
								onClick={createSortHandler(column.id)}
							>
								{column.label}
								{orderBy === column.id ? (
									<Box component="span" sx={visuallyHidden}>
										{order === 'desc' ? 'sorted descending' : 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						) : (
							<>
								<span>{column.id}</span>
								<Tooltip title={column.tooltip ?? ''} placement="top" enterTouchDelay={0}>
									<IconButton>
										<InfoOutlinedIcon />
									</IconButton>
								</Tooltip>
							</>
						)}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}
