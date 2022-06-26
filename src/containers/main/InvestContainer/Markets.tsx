import React, { FC } from 'react';
import Skeleton from '@mui/material/Skeleton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { BigNumber, ethers } from 'ethers';
import type { FlowTypes, IndexIDAType, Pool } from 'constants/flowConfig';
import { calculateStreamed } from './utils/calculateStreamed';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { getAddressLink } from 'utils/getAddressLink';
import { ReceivedPlaceholder } from './ReceivedPlaceholder';
import { PricePlaceholder } from './PricePlaceholder';
import { Operation } from './Operation';

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
	// --- * ---
	pool: Pool;
	type: FlowTypes;
	// --- * ---
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
	list: IndexIDAType;
	flowType: FlowTypes;
};

export const Markets: FC<MarketsProps> = ({ loading, error, streamsData, distributionsData, list, flowType }) => {
	const state = useShallowSelector(selectMain);
	const { address, balances, web3 } = state;

	// height of the table
	if (loading) return <Skeleton variant="rectangular" height={440} />;
	if (error) return <p>Error :</p>;

	const rows: Row[] = list.map((item) => {
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
			pool: item.pool,
			superToken: item.output,
			type: item.type,
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
						{rows.map((row) => {
							const {
								coinA,
								coinB,
								inflowRate,
								pool,
								type,
								tokenA,
								tokenB,
								superToken,
								streamed,
								streamInTokenBalance,
								streams,
								distributeOutTokenBalance,
								exchangeAddress,
								tvs,
							} = row;
							const link = getAddressLink(exchangeAddress);

							return (
								<TableRow key={`${coinA}-${coinB}`}>
									<TableCell sx={{ minWidth: 256 }}>
										<div
											style={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'space-between',
											}}
										>
											<div style={{ width: '160px' }}>
												<span>{coinA}</span>
												<span>{' >> '}</span>
												<span>{coinB}</span>
											</div>
											<div>
												<Link
													href={link}
													target="_blank"
													rel="noreferrer"
													underline="none"
													sx={{
														'&:hover': {
															color: 'info.main',
														},
														'&:active': {
															color: 'info.main',
														},
														'&:visited': {
															color: 'secondary.main',
														},
													}}
												>
													<OpenInNewIcon />
												</Link>
											</div>
											<Operation account={address} inflowRate={inflowRate} />
										</div>
									</TableCell>
									<TableCell>
										<PricePlaceholder
											pool={pool}
											tokenA={tokenA}
											tokenB={tokenB}
											type={type}
											web3={web3}
											coinA={coinA}
										/>
									</TableCell>
									<TableCell>{inflowRate ? `${inflowRate} ${tokenA}/month` : '-'}</TableCell>
									<TableCell>{streamed ? `${(+streamed).toFixed(6)} ${tokenA}` : '-'}</TableCell>
									<TableCell>
										<ReceivedPlaceholder
											distributions={distributionsData?.indexSubscriptions}
											exchangeAddress={exchangeAddress}
											superToken={superToken}
											token={tokenB}
											account={address}
											web3={web3}
										/>
									</TableCell>
									<TableCell>{streamInTokenBalance ?? '-'}</TableCell>
									<TableCell>{distributeOutTokenBalance ?? '-'}</TableCell>
									<TableCell>{tvs}</TableCell>
									<TableCell>{streams !== undefined ? streams : '-'}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
