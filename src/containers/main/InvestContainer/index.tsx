import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UserSettings } from 'components/layout/UserSettings';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { RICAddress } from 'constants/polygon_config';
import { useDispatch } from 'react-redux';
import { connectWeb3Modal, startFlowAction, stopFlowAction } from 'store/main/actionCreators';
import styles from './styles.module.scss';
import { InteractiveStreamManager } from '../InteractiveStreamManager';
import { TabPanel } from './TabPanel';
import { InvestMarket } from './InvestMarket';
import { SignInButton } from 'components/banks/SignInButton';
import { useRouteMatch } from 'react-router-dom';
import { FlowTypes, RoutesToFlowTypes } from 'constants/flowConfig';
import { TradeHistoryTable } from '../TradeHistory';
import { TabLabel } from './TabLabel';

export enum TABS {
	'MARKETS',
	'STREAMS',
	'TRADES',
}

interface IProps {}
export const InvestContainer: React.FC<IProps> = () => {
	const state = useShallowSelector(selectMain);
	const { address, balances } = state;
	const dispatch = useDispatch();

	const match = useRouteMatch();
	const flowType = RoutesToFlowTypes[match.path];

	const [currentTab, setCurrentTab] = useState<TABS>(TABS.MARKETS);
	const switchTab = (evt: React.SyntheticEvent, tab: TABS) => setCurrentTab(tab);

	const handleStart = useCallback(
		(config: { [key: string]: string }) => (amount: string, callback: (e?: string) => void) => {
			dispatch(startFlowAction(amount, config, callback));
		},
		[dispatch],
	);

	const handleStop = useCallback(
		(config: { [key: string]: string }) => (callback: (e?: string) => void) => {
			dispatch(stopFlowAction(config, callback));
			debugger;
		},
		[dispatch],
	);

	const handleSignIn = useCallback(() => {
		dispatch(connectWeb3Modal());
	}, [dispatch]);

	return (
		<div className={styles.outer_container}>
			<div className={styles.settings_mob}>
				<UserSettings
					className={styles.dot}
					ricBalance={balances && balances[RICAddress]}
					account={address || 'Connect Wallet'}
				/>
			</div>
			<div className={styles.container}>
				<div
					className={styles.content}
					style={
						currentTab === TABS.STREAMS
							? { width: '100%', height: 'calc(100vh - 200px)', overflowY: 'auto' }
							: {}
					}
				>
					{flowType === FlowTypes.market ? (
						<Box sx={{ width: '100%', height: '100%' }}>
							<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
								<Tabs value={currentTab} onChange={switchTab} aria-label="rex market tabs">
									<Tab
										label="Markets"
										id={`${TABS.MARKETS}`}
										aria-controls={`tabpanel-${TABS.MARKETS}`}
										sx={{ textTransform: 'none', color: 'white' }}
									/>
									<Tab
										label={<TabLabel labelContent="Streams" />}
										id={`${TABS.STREAMS}`}
										aria-controls={`tabpanel-${TABS.STREAMS}`}
										sx={{ textTransform: 'none' }}
									/>
									<Tab
										label={<TabLabel labelContent="Trades" />}
										id={`${TABS.TRADES}`}
										aria-controls={`tabpanel-${TABS.TRADES}`}
										sx={{ textTransform: 'none' }}
									/>
								</Tabs>
							</Box>
							<TabPanel index={TABS.MARKETS} tab={currentTab}>
								<InvestMarket handleStart={handleStart} handleStop={handleStop} />
							</TabPanel>
							<TabPanel index={TABS.STREAMS} tab={currentTab}>
								{address ? (
									<InteractiveStreamManager handleStart={handleStart} handleStop={handleStop} />
								) : (
									<div className={styles.connectWalletContainer}>
										<p>{'Please connect your wallet'}</p>
										<SignInButton onClick={handleSignIn} />
									</div>
								)}
							</TabPanel>
							<TabPanel index={TABS.TRADES} tab={currentTab}>
								{address ? (
									<TradeHistoryTable address={address} />
								) : (
									<div className={styles.connectWalletContainer}>
										<p>{'Please connect your wallet'}</p>
										<SignInButton onClick={handleSignIn} />
									</div>
								)}
							</TabPanel>
						</Box>
					) : (
						<InvestMarket handleStart={handleStart} handleStop={handleStop} />
					)}
				</div>

				<div>
					<span className={styles.fee_disclaimer}>{'Ricochet takes a 2% fee on swaps.'}</span>
				</div>
			</div>
		</div>
	);
};
