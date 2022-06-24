import * as React from 'react';
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
import { map } from '../TradeHistory/Content';

interface Row {
	market: string;
	price: string;
	inflowRate: string;
	streamed: string;
	received: string;
	streamInTokenBalance: string;
	distributeOutTokenBalance: string;
	tvs: string;
	streams: number;
}

const rowsNew: Row[] = map.map((item) => {
	return {
		market: `${item.wrappedToken.tokenA} >> ${item.wrappedToken.tokenB}`,
		price: `1078.989 ${item.superToken.tokenA}/USD`,
		inflowRate: `10k ${item.superToken.tokenA}/month`,
		streamed: `554.50 ${item.superToken.tokenA}`,
		received: `0.4510000 ${item.superToken.tokenB}`,
		streamInTokenBalance: `5000 ${item.superToken.tokenA}`,
		distributeOutTokenBalance: `0.025483 ${item.superToken.tokenB}`,
		tvs: `27,000 ${item.superToken.tokenA}/month`,
		streams: 14,
	};
});

export const Market = () => {
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
						{rowsNew.map((row) => (
							<TableRow key={row.market}>
								<TableCell sx={{ minWidth: 256 }}>
									<div
										style={{
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'space-between',
										}}
									>
										<div>{row.market}</div>
										<Stack direction="row" spacing={1}>
											{/* has stream? */}
											{true ? (
												<IconButton color="success" aria-label="start a stream">
													<PlayArrowIcon />
												</IconButton>
											) : (
												<IconButton color="success" aria-label="edit the stream">
													<PauseIcon />
												</IconButton>
											)}
											{/* has stream? */}
											<IconButton color="error" aria-label="stop the stream" disabled={true}>
												<StopIcon />
											</IconButton>
										</Stack>
									</div>
								</TableCell>
								<TableCell>{row.price}</TableCell>
								<TableCell>{row.inflowRate}</TableCell>
								<TableCell>{row.streamed}</TableCell>
								<TableCell>{row.received}</TableCell>
								<TableCell>{row.streamInTokenBalance}</TableCell>
								<TableCell>{row.distributeOutTokenBalance}</TableCell>
								<TableCell>{row.tvs}</TableCell>
								<TableCell>{row.streams}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
};
