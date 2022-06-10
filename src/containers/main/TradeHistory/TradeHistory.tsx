import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import Skeleton from '@mui/material/Skeleton';
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
import { indexIDA } from 'constants/flowConfig';
import { GET_DISTRIBUTIONS, GET_STREAMS } from './data/queries';
import { quickSwapPools, sushiSwapPools } from 'constants/poolAddresses';
import { queryQuickSwapPoolPrices, querySushiPoolPrices } from 'api';

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
		tooltip: "USD amount = the Super Token's (below) price at time of stream close * tokenAmount.",
	},
	{
		id: 'Output',
		label: 'Output',
		minWidth: 112,
		align: 'left',
		tooltip: "USD amount = the Super Token's (below) price at time of stream close * tokenAmount.",
	},
	{
		id: 'PnL',
		label: 'PNL',
		minWidth: 112,
		align: 'left',
		tooltip: 'PnL (profit and loss) = (USD amount out - USD amount in) / USD amount in.',
	},
];

interface Data {
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
}

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
			content = `${row.input.tokenAmount.toFixed(6)} ${row.input.coin} ($${row.input.usdAmount.toFixed(4)})`;
			break;

		case 'Output':
			content = `${row.output.tokenAmount.toFixed(6)} ${row.output.coin} ($${row.output.usdAmount.toFixed(4)})`;
			break;

		case 'PnL':
			content = `${row.pnl.amount.toFixed(2)} (${row.pnl.percent.toFixed(2)}%)`;
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

const exchangeAddresses = indexIDA.map((ida) => ida.exchangeAddress.toLowerCase());

type TradeHistoryProps = {
	address: string;
};

export function TradeHistoryTable({ address }: TradeHistoryProps) {
	const [order, setOrder] = useState<Order>('asc');
	const [orderBy, setOrderBy] = useState<'startDate' | 'endDate'>('startDate');
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [marketPairPrices, setMarketPairPrices] = useState<Record<string, Record<string, string>> | null>(null);

	const {
		loading: queryingStreams,
		error: queryStreamsError,
		data: streamsData,
	} = useQuery(GET_STREAMS, {
		variables: { sender: address.toLowerCase(), receivers: [...exchangeAddresses] },
	});

	const {
		loading: queryingDistributions,
		error: queryDistributionsError,
		data: distributionsData,
	} = useQuery(GET_DISTRIBUTIONS, {
		skip: queryingStreams,
		variables: {
			subscriber: address.toLowerCase(),
			updatedAtTimestamps:
				streamsData && streamsData.streams.length
					? [...streamsData.streams].map((data) => data.stream.updatedAtTimestamp)
					: [],
		},
	});

	useEffect(() => {
		let isMounted = true;
		let _marketPairPrices: any = {};

		Object.entries(sushiSwapPools).forEach(async ([poolName, pool]) => {
			const poolAddress = pool.toLowerCase();
			try {
				const { data } = await querySushiPoolPrices(poolAddress);

				if (data.error) {
					throw new Error('Error querying sushiSwapPoolPrices: ', data.error);
				}
				_marketPairPrices[poolName] = {
					/**
					 * talked about this here: https://discord.com/channels/748031363935895552/748032044289753118/984745435266678824
					 */
					[data.data.pair.token0.symbol]:
						(Number(data.data.pair.reserveUSD) * 0.5) / Number(data.data.pair.reserve0),
					[data.data.pair.token1.symbol]:
						(Number(data.data.pair.reserveUSD) * 0.5) / Number(data.data.pair.reserve1),
				};
			} catch (error) {
				console.error(error);
			}
		});

		Object.entries(quickSwapPools).forEach(async ([poolName, pool], idx) => {
			const poolAddress = pool.toLowerCase();
			try {
				const { data } = await queryQuickSwapPoolPrices(poolAddress);

				if (data.error) {
					throw new Error('Error querying quickSwapPoolPrices: ', data.error);
				}
				_marketPairPrices[poolName] = {
					/**
					 * token0 price = reserveUSD / 2 / reserve0
					 * token1 price = reserveUSD / 2 / reserve1
					 */
					[data.data.pair.token0.symbol]:
						(Number(data.data.pair.reserveUSD) * 0.5) / Number(data.data.pair.reserve0),
					[data.data.pair.token1.symbol]:
						(Number(data.data.pair.reserveUSD) * 0.5) / Number(data.data.pair.reserve1),
				};
				if (idx === Object.keys(quickSwapPools).length - 1) {
					if (isMounted) {
						setMarketPairPrices(_marketPairPrices);
					}
				}
			} catch (error) {
				console.error(error);
			}
		});

		return () => {
			isMounted = false;
		};
	}, []);

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

	if (queryingStreams || queryingDistributions) {
		return <Skeleton animation="wave" width={'100%'} height={80} />;
	}

	if (queryStreamsError || queryDistributionsError) {
		return <div>Something wrong when fetching trades history.</div>;
	}

	if (!streamsData.streams.length || !distributionsData.distributions.length) {
		return <div>You have no trades.</div>;
	}

	const rows: Data[] = [];
	const newStreamsData = [];

	// Note: streamsData.streams' length must be even.
	for (let i = 0; i < streamsData.streams.length; i += 2) {
		const data = {
			timestamp: {
				createdAt: streamsData.streams[i].stream.createdAtTimestamp,
				terminatedAt: streamsData.streams[i].stream.updatedAtTimestamp,
			},
			totalAmountStreamedUntilTimestamp: streamsData.streams[i].totalAmountStreamedUntilTimestamp,
			transactionHash: {
				created: streamsData.streams[i + 1].transactionHash,
				terminated: streamsData.streams[i].transactionHash,
			},
			token: { ...streamsData.streams[i].stream.token },
			receiver: streamsData.streams[i].receiver,
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
				tokenAmount: Number(data.totalAmountStreamedUntilTimestamp) / 1e18,
				usdAmount: 0,
				txn: data.transactionHash.created,
			},
			output: {
				coin: distribution.index.token.symbol,
				tokenAmount: Number(distribution.totalAmountReceivedUntilUpdatedAt) / 1e18,
				usdAmount: 0,
				txn: data.transactionHash.terminated,
			},
			pnl: {
				amount: 0,
				percent: 0,
			},
		};

		if (marketPairPrices) {
			const coinA = row.input.coin.replace('x', '');
			const coinB = row.output.coin.replace('x', '');
			const marketPairPrice = marketPairPrices[`${coinA}-${coinB}`];
			row.input.usdAmount = marketPairPrice ? row.input.tokenAmount * Number(marketPairPrice[coinA]) : 0;
			row.output.usdAmount = marketPairPrice ? row.output.tokenAmount * Number(marketPairPrice[coinB]) : 0;
			row.pnl.amount = row.output.usdAmount - row.input.usdAmount;
			row.pnl.percent = row.input.usdAmount === 0 ? 0 : (row.pnl.amount / row.input.usdAmount) * 100;
		}

		rows.push(row);
	}

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
