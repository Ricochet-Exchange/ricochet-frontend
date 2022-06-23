import React, { FC } from 'react';
import TableSortLabel from '@mui/material/TableSortLabel';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import type { Column } from './types';
import type { Order } from './TradeHistory';
import { Container, Wrapper } from './Content';

type CustomTableCellProps = {
	column: Column;
	createSortHandler: any;
	order: Order;
	orderBy: string;
};

export const CustomTableCell: FC<CustomTableCellProps> = ({ column, orderBy, order, createSortHandler }) => {
	switch (column.id) {
		case 'startDate':
		case 'endDate':
			return (
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
			);

		case 'Input':
		case 'Output':
			return (
				<>
					<div>
						<span>{column.label}</span>
						<Tooltip title={column.tooltip ?? ''} placement="top" enterTouchDelay={0}>
							<IconButton sx={{ width: '12.5%' }}>
								<InfoOutlinedIcon />
							</IconButton>
						</Tooltip>
					</div>
					<Container>
						<Wrapper>Token</Wrapper>
						<Wrapper>Price</Wrapper>
						<Wrapper>Amount</Wrapper>
						<Wrapper>USD</Wrapper>
					</Container>
				</>
			);

		case 'PnL':
			return (
				<>
					<div>
						<span>{column.label}</span>
						<Tooltip title={column.tooltip ?? ''} placement="top" enterTouchDelay={0}>
							<IconButton>
								<InfoOutlinedIcon />
							</IconButton>
						</Tooltip>
					</div>
					<div style={{ display: 'flex' }}>
						<span style={{ width: '50%' }}>Value</span>
						<span style={{ width: '50%' }}>Percentage</span>
					</div>
				</>
			);

		default:
			return <span>{''}</span>;
	}
};
