import React, { FC } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import { BigNumber, ethers } from 'ethers';
import { indexIDA } from 'constants/flowConfig';
import { calculateStreamed } from './utils/calculateStreamed';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { ReceivedPlaceholder } from './ReceivedPlaceholder';

export interface Row {
	// wrapped coins(eg, WETH)
	coinA: string;
	coinB: string;
	// super tokens(eg, ETHx)
	tokenA: string;
	tokenB: string;
	// --- * ---
	exchangeAddress: string;
	superToken: string;
	// --- * ---
	price: string;
	inflowRate: string;
	streamed: string;
	received: string;
	streamInTokenBalance?: string;
	distributeOutTokenBalance?: string;
	tvs: string;
	streams?: number;
}

type MarketsProps = {
	loading: boolean;
	error: any;
	streamsData: any;
	distributionsData: any;
};

export const Markets: FC<MarketsProps> = ({ loading, error, streamsData, distributionsData }) => {
	const state = useShallowSelector(selectMain);
	const { address, balances, web3 } = state;

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :</p>;

	const rows: Row[] = indexIDA
		.slice(0, indexIDA.length - 1) // omit lanchpad streams for now.
		.map((item) => {
			let inflowRate = '';
			let streamed = '';
			let received = '';

			const currentStream = streamsData?.streams.find(
				(stream: any) =>
					stream.token.symbol === item.superToken.tokenA &&
					stream.receiver.id === item.exchangeAddress.toLowerCase(),
			);

			if (currentStream) {
				const { currentFlowRate, streamedUntilUpdatedAt, updatedAtTimestamp } = currentStream;
				const currentFlowRateBN = BigNumber.from(currentFlowRate);

				inflowRate = ethers.utils.formatEther(currentFlowRateBN.mul(30 * 24 * 60 * 60));
				streamed = calculateStreamed(streamedUntilUpdatedAt, updatedAtTimestamp, currentFlowRate);
			}

			return {
				coinA: item.wrappedToken.tokenA,
				coinB: item.wrappedToken.tokenB,
				tokenA: item.superToken.tokenA,
				tokenB: item.superToken.tokenB,
				exchangeAddress: item.exchangeAddress,
				superToken: item.output,
				price: `1078.989 ${item.superToken.tokenA}/USD`,
				inflowRate,
				streamed,
				received,
				streamInTokenBalance:
					address && balances
						? `${Number(balances[item.input]).toFixed(6)} ${item.superToken.tokenA}`
						: undefined,
				distributeOutTokenBalance:
					address && balances
						? `${Number(balances[item.output]).toFixed(6)} ${item.superToken.tokenB}`
						: undefined,
				tvs:
					state[item.flowKey]?.flowsOwned !== undefined
						? `${state[item.flowKey]?.flowsOwned} ${item.superToken.tokenA}/month`
						: '-',
				streams: state[item.flowKey]?.totalFlows,
			};
		});

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="markets">
					<TableHead>
						<TableRow>
							<TableCell>Market</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Inflow Rate</TableCell>
							<TableCell>Streamed</TableCell>
							<TableCell>Received</TableCell>
							<TableCell>Input Token Balance</TableCell>
							<TableCell>Output Token Balance</TableCell>
							<TableCell>TVS</TableCell>
							<TableCell>Active Streams</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={`${row.coinA}-${row.coinB}`}>
								<TableCell sx={{ minWidth: 256 }}>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										<div>
											<span>{row.coinA}</span>
											<span>{' >> '}</span>
											<span>{row.coinB}</span>
										</div>
										<Stack direction="row" spacing={1}>
											{/* has stream? */}
											{!row.inflowRate ? (
												<IconButton color="success" aria-label="start a stream">
													<PlayArrowIcon />
												</IconButton>
											) : (
												<IconButton color="success" aria-label="edit the stream">
													<PauseIcon />
												</IconButton>
											)}
											{/* has stream? */}
											<IconButton
												color="error"
												aria-label="stop the stream"
												disabled={!row.inflowRate}
											>
												<StopIcon />
											</IconButton>
										</Stack>
									</div>
								</TableCell>
								<TableCell>{row.price}</TableCell>
								<TableCell>{row.inflowRate ? `${row.inflowRate} ${row.tokenA}/month` : '-'}</TableCell>
								<TableCell>{row.streamed ? `${row.streamed} ${row.tokenA}` : '-'}</TableCell>
								<TableCell>
									<ReceivedPlaceholder
										distributions={distributionsData?.indexSubscriptions}
										exchangeAddress={row.exchangeAddress}
										superToken={row.superToken}
										token={row.tokenB}
										account={address}
										web3={web3}
									/>
								</TableCell>
								<TableCell>{row.streamInTokenBalance ?? '-'}</TableCell>
								<TableCell>{row.distributeOutTokenBalance ?? '-'}</TableCell>
								<TableCell>{row.tvs}</TableCell>
								<TableCell>{row.streams !== undefined ? row.streams : '-'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
