import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './styles.module.scss';
import { indexIDA } from 'constants/flowConfig';
import { GET_DISTRIBUTIONS, GET_STREAMS_CREATED, GET_STREAMS_TERMINATED } from './data/queries';
import type { Column, Data } from './types';
import { EnhancedTableHead } from './EnhancedTableHead';
import { Content } from './Content';

const columns: Column[] = [
	{
		id: 'startDate',
		label: 'Start Date',
		minWidth: 112,
		align: 'left',
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
		minWidth: 360,
		align: 'center',
		tooltip: 'at the timestamp of the stream closed.',
	},
	{
		id: 'Output',
		label: 'Output',
		minWidth: 360,
		align: 'center',
		tooltip: 'at the timestamp of the stream closed.',
	},
	{
		id: 'PnL',
		label: 'PNL',
		minWidth: 250,
		align: 'center',
		tooltip: 'PnL (profit and loss) = (USD amount out - USD amount in) / USD amount in.',
	},
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

export type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === 'desc'
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

const exchangeAddresses = indexIDA.map((ida) => ida.exchangeAddress.toLowerCase());

type TradeHistoryProps = {
	address: string;
};

export function TradeHistoryTable({ address }: TradeHistoryProps) {
	const [order, setOrder] = useState<Order>('desc');
	const [orderBy, setOrderBy] = useState<'startDate' | 'endDate'>('startDate');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	// 3-1. query streams by `terminated` type first, because trading history page needs.
	const {
		loading: queryingTerminatedStreams,
		error: queryTerminatedStreamsError,
		data: terminatedStreams,
	} = useQuery(GET_STREAMS_TERMINATED, {
		variables: {
			sender: address.toLowerCase(),
			receivers: [...exchangeAddresses],
		},
	});

	// 3-2. query streams by `created` to get its transactionHash.
	const {
		loading: queryingCreatedStreams,
		error: queryCreatedStreamsError,
		data: createdStreams,
	} = useQuery(GET_STREAMS_CREATED, {
		skip: queryingTerminatedStreams,
		variables: {
			sender: address.toLowerCase(),
			receivers: [...exchangeAddresses],
			createdAtTimestamps:
				terminatedStreams && terminatedStreams.streams.length
					? [...terminatedStreams.streams].map((data) => data.stream.createdAtTimestamp)
					: [],
		},
	});

	// 3-3. query distribution data finally.
	const {
		loading: queryingDistributions,
		error: queryDistributionsError,
		data: distributionsData,
	} = useQuery(GET_DISTRIBUTIONS, {
		skip: queryingCreatedStreams,
		variables: {
			subscriber: address.toLowerCase(),
			updatedAtTimestamps:
				createdStreams && createdStreams.streams.length
					? [...createdStreams.streams].map((data) => data.flowUpdatedEvents[0].stream.updatedAtTimestamp)
					: [],
		},
	});

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

	if (queryingTerminatedStreams || queryingCreatedStreams || queryingDistributions) {
		return <Skeleton animation="wave" width={'100%'} height={80} />;
	}

	if (queryTerminatedStreamsError || queryCreatedStreamsError || queryDistributionsError) {
		return <div>Something wrong when fetching trades history.</div>;
	}

	if (
		!terminatedStreams.streams.length ||
		!createdStreams.streams.length ||
		!distributionsData.distributions.length
	) {
		return <div className={styles.noTrades}>You have no trades.</div>;
	}

	const rows: Data[] = [];
	const newStreamsData = [];

	for (let i = 0; i < terminatedStreams.streams.length; i += 1) {
		const terminatedStream = terminatedStreams.streams[i];
		const createdStream = createdStreams.streams.find(
			(data: any) =>
				data.flowUpdatedEvents[0].stream.createdAtTimestamp === terminatedStream.stream.createdAtTimestamp,
		);
		if (!createdStream) continue;
		const data = {
			timestamp: {
				createdAt: terminatedStream.stream.createdAtTimestamp,
				terminatedAt: terminatedStream.stream.updatedAtTimestamp,
			},
			totalAmountStreamedUntilTimestamp: terminatedStream.totalAmountStreamedUntilTimestamp,
			transactionHash: {
				created: createdStream.flowUpdatedEvents[0].transactionHash,
				terminated: terminatedStream.transactionHash,
			},
			token: { ...terminatedStream.stream.token },
			receiver: terminatedStream.receiver,
		};
		newStreamsData.push(data);
	}

	// Exclude subsidy token.
	for (let i = 0; i < newStreamsData.length; i++) {
		const data = newStreamsData[i];
		// find specific market.
		const market = indexIDA.find(
			(ida) => ida.input.toLowerCase() === data.token.id && ida.exchangeAddress.toLowerCase() === data.receiver,
		);
		// must can find a specific market by input token and exchange address.
		if (!market) continue;
		const distribution = distributionsData.distributions.find(
			(d: any) =>
				d.updatedAtTimestamp === data.timestamp.terminatedAt &&
				d.index.token.id === market.output.toLowerCase(),
		);
		if (!distribution) continue;

		const row: Data = {
			startDate: Number(data.timestamp.createdAt) * 1e3,
			endDate: Number(data.timestamp.terminatedAt) * 1e3,
			input: {
				coin: data.token.symbol,
				amount: Number(data.totalAmountStreamedUntilTimestamp) / 1e18,
				price: 0,
				txn: data.transactionHash.created,
			},
			output: {
				coin: distribution.index.token.symbol,
				amount: Number(distribution.totalAmountReceivedUntilUpdatedAt) / 1e18,
				price: 0,
				txn: data.transactionHash.terminated,
			},
			pnl: {
				amount: 0,
				percent: 0,
			},
			updatedAtBlockNumber: Number(distribution.updatedAtBlockNumber),
		};

		rows.push(row);
	}

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<EnhancedTableHead
						columns={columns}
						onRequestSort={handleRequestSort}
						order={order}
						orderBy={orderBy}
					/>
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
