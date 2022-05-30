import * as React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { visuallyHidden } from '@mui/utils';
import dayjs from 'dayjs';
import { Coin } from 'constants/coins';
import styles from './styles.module.scss';

type ColumnName = 'startDate' | 'endDate' | 'Input' | 'Output' | 'PnL';

interface Column {
	id: ColumnName;
	label: string;
	minWidth?: number;
	align?: 'right' | 'left';
	tooltip?: string;
	format?: (value: number) => string;
}

const columns: readonly Column[] = [
	{
		id: 'startDate',
		label: 'Start Date',
		minWidth: 112,
		align: 'left',
		// format: (value: number) => value.toLocaleString('en-US')
	},
	{
		id: 'endDate',
		label: 'End Date',
		minWidth: 112,
		align: 'left',
	},
	{
		id: 'Input',
		label: 'Input',
		minWidth: 112,
		align: 'left',
		tooltip: 'the USD amount is based on the Super Token price at the start of the trade.',
	},
	{
		id: 'Output',
		label: 'Output',
		minWidth: 112,
		align: 'left',
		tooltip: 'the USD amount is based on the Super Token price at the end of the trade.',
	},
	{
		id: 'PnL',
		label: 'PNL',
		minWidth: 112,
		align: 'left',
		tooltip: 'PnL means profit and loss, and is calculated by (USD amount out - USD amount in) / USD amount in.',
	},
];

interface Data {
	startDate: string;
	endDate: string;
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
}

const rows: Array<Data> = [
	{
		startDate: '1647100800000',
		endDate: '1647792000000',
		input: {
			coin: Coin.USDCx,
			tokenAmount: 100,
			usdAmount: 100.01,
			txn: '',
		},
		output: {
			coin: Coin.ETHx,
			tokenAmount: 0.07,
			usdAmount: 110.02,
			txn: '',
		},
		pnl: {
			amount: 10.01,
			percent: 10,
		},
	},
	{
		startDate: '1646841600000',
		endDate: '1647878400000',
		input: {
			coin: Coin.USDCx,
			tokenAmount: 200,
			usdAmount: 200.02,
			txn: '',
		},
		output: {
			coin: Coin.WBTCx,
			tokenAmount: 0.01,
			usdAmount: 200.02,
			txn: '',
		},
		pnl: {
			amount: 20.0,
			percent: 10,
		},
	},
];

type ContentProps = {
	id: ColumnName;
	row: Data;
};

function Content({ id, row }: ContentProps) {
	let content;

	switch (id) {
		case 'startDate':
			content = dayjs(Number(row.startDate)).format('DD/MM/YY');
			break;

		case 'endDate':
			content = dayjs(Number(row.endDate)).format('DD/MM/YY');
			break;

		case 'Input':
			content = `${row.input.tokenAmount} ${row.input.coin} ($${row.input.usdAmount})`;
			break;

		case 'Output':
			content = `${row.output.tokenAmount} ${row.output.coin} ($${row.output.usdAmount})`;
			break;

		case 'PnL':
			content = `${row.pnl.amount.toFixed(2)} (${row.pnl.percent}%)`;
			break;

		default:
			content = 'not found';
			break;
	}

	return <span>{content}</span>;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

interface EnhancedTableProps {
	onRequestSort: (event: React.MouseEvent<unknown>, property: 'startDate' | 'endDate') => void;
	order: Order;
	orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onRequestSort, order, orderBy } = props;
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

export default function TradeHistoryTable() {
	const [order, setOrder] = React.useState<Order>('asc');
	const [orderBy, setOrderBy] = React.useState<'startDate' | 'endDate'>('startDate');
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleRequestSort = (event: React.MouseEvent<unknown>, property: 'startDate' | 'endDate') => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<EnhancedTableHead onRequestSort={handleRequestSort} order={order} orderBy={orderBy} />
					<TableBody>
						{rows
							.sort(getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row, idx) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={idx}>
										{columns.map((column) => {
											return (
												<TableCell key={column.id} align={column.align}>
													<Content id={column.id} row={row} />{' '}
													{column.id === 'startDate' ? (
														<a
															href={`https://polygonscan.com/tx/${row.input.txn}`}
															target="_blank"
															rel="noreferrer"
															className={styles.link}
														>
															<OpenInNewIcon sx={{ width: 16, height: 16 }} />
														</a>
													) : column.id === 'endDate' ? (
														<a
															href={`https://polygonscan.com/tx/${row.output.txn}`}
															target="_blank"
															rel="noreferrer"
															className={styles.link}
														>
															<OpenInNewIcon sx={{ width: 16, height: 16 }} />
														</a>
													) : null}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
}
