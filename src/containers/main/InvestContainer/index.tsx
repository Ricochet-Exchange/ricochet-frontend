import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { UserSettings } from 'components/layout/UserSettings';
import { InvestNav } from 'components/layout/InvestNav';
import { useTranslation } from 'react-i18next';
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
import { FlowTypes, indexIDA, RoutesToFlowTypes } from 'constants/flowConfig';
import { TradeHistoryTable } from '../TradeHistory';
import { TabLabel } from './TabLabel';
import { Markets } from './Markets';
import { useQuery } from '@apollo/client';
import { GET_DISTRIBUTIONS, GET_STREAMS } from './data/queries';

export enum TABS {
	'MARKETS',
	'STREAMS',
	'TRADES',
}

const exchangeAddresses = indexIDA
	.slice(0, indexIDA.length - 1) // omit lanchpad streams for now.
	.map((ida) => ida.exchangeAddress.toLowerCase());

interface IProps {}
export const InvestContainer: React.FC<IProps> = () => {
	const { t } = useTranslation();
	const state = useShallowSelector(selectMain);
	const { address, balances } = state;
	const dispatch = useDispatch();

	const match = useRouteMatch();
	const flowType = RoutesToFlowTypes[match.path];

	const [currentTab, setCurrentTab] = useState<TABS>(TABS.MARKETS);
	const switchTab = (evt: React.SyntheticEvent, tab: TABS) => setCurrentTab(tab);

	// query streams.
	const {
		loading: queryingStreams,
		error: queryStreamError,
		data: streamsData,
	} = useQuery(GET_STREAMS, {
		skip: !address,
		variables: {
			sender: address.toLowerCase(),
			receivers: [...exchangeAddresses],
		},
	});

	// query distributions.
	const {
		loading: queryingDistribution,
		error: queryDistributionError,
		data: distributionsData,
	} = useQuery(GET_DISTRIBUTIONS, {
		skip: !streamsData,
		variables: {
			subscriber: address.toLowerCase(),
			updatedAtTimestamps: streamsData?.streams.length
				? streamsData?.streams.map((stream: any) => stream.updatedAtTimestamp)
				: [],
		},
	});

	const loading = queryingStreams || queryingDistribution;
	const error = queryStreamError || queryDistributionError;

	const handleStart = useCallback(
		(config: { [key: string]: string }) => (amount: string, callback: (e?: string) => void) => {
			dispatch(startFlowAction(amount, config, callback));
		},
		[dispatch],
	);

	const handleStop = useCallback(
		(config: { [key: string]: string }) => (callback: (e?: string) => void) => {
			dispatch(stopFlowAction(config, callback));
		},
		[dispatch],
	);

	const handleSignIn = useCallback(() => {
		dispatch(connectWeb3Modal());
	}, [dispatch]);

	return (
		<div className={styles.outer_container}>
			<InvestNav />
			<div className={styles.settings_mob}>
				<UserSettings
					className={styles.dot}
					ricBalance={balances && balances[RICAddress]}
					account={address || t('Connect Wallet')}
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
										sx={{ textTransform: 'none' }}
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
								{/* <InvestMarket handleStart={handleStart} handleStop={handleStop} /> */}
								<Markets
									loading={loading}
									error={error}
									streamsData={streamsData}
									distributionsData={distributionsData}
								/>
							</TabPanel>
							<TabPanel index={TABS.STREAMS} tab={currentTab}>
								{address ? (
									<InteractiveStreamManager handleStart={handleStart} handleStop={handleStop} />
								) : (
									<div className={styles.connectWalletContainer}>
										<p>{t('Please connect your wallet')}</p>
										<SignInButton onClick={handleSignIn} />
									</div>
								)}
							</TabPanel>
							<TabPanel index={TABS.TRADES} tab={currentTab}>
								{address ? (
									<TradeHistoryTable address={address} />
								) : (
									<div className={styles.connectWalletContainer}>
										<p>{t('Please connect your wallet')}</p>
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
					<span className={styles.fee_disclaimer}>{t('Ricochet takes a 2% fee on swaps.')}</span>
				</div>
			</div>
		</div>
	);
};
