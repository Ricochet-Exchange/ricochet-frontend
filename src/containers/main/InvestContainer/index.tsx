import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useRouteMatch } from 'react-router-dom';
import { UserSettings } from 'components/layout/UserSettings';
import { InvestNav } from 'components/layout/InvestNav';
import { useTranslation } from 'react-i18next';
import { flowConfig, RoutesToFlowTypes } from 'constants/flowConfig';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain, selectUserStreams } from 'store/main/selectors';
import { RICAddress } from 'constants/polygon_config';
import { useDispatch } from 'react-redux';
import { startFlowAction, stopFlowAction } from 'store/main/actionCreators';
import styles from './styles.module.scss';
import { InteractiveStreamManager } from '../InteractiveStreamManager';
import { TabPanel } from './InvestTabPanel';
import { InvestMarket } from './InvestMarket';

export enum TABS {
	'MARKET',
	'INTERACTIVE',
}

interface IProps {}
export const InvestContainer: React.FC<IProps> = () => {
	const { t } = useTranslation();
	const state = useShallowSelector(selectMain);
	const { address, balances } = state;
	const userStreams = useShallowSelector(selectUserStreams);
	const dispatch = useDispatch();
	const [filteredList, setFilteredList] = useState(flowConfig);
	const match = useRouteMatch();
	const routeEnd = match.path.slice(-7);
	const flowType = RoutesToFlowTypes[match.path];

	const [currentTab, setCurrentTab] = useState<TABS>(TABS.MARKET);
	const switchTab = (evt: React.SyntheticEvent, tab: TABS) => setCurrentTab(tab);

	useEffect(() => {
		console.log(filteredList);
	}, [filteredList]);

	useEffect(() => {
		if (flowType) {
			setFilteredList(flowConfig.filter((each) => each.type === flowType));
		} else {
			const sortedUserStreams = userStreams.sort((a, b) => {
				const flowA = parseFloat(state[a.flowKey]?.placeholder || '0');
				const flowB = parseFloat(state[b.flowKey]?.placeholder || '0');
				return flowB - flowA;
			});
			setFilteredList(sortedUserStreams);
		}
	}, [flowType, state, userStreams]);

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
				<div className={styles.content}>
					<Box sx={{ width: '100%', height: '100%' }}>
						<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
							<Tabs value={currentTab} onChange={switchTab} aria-label="rex market tabs">
								<Tab label="Market" id={`${TABS.MARKET}`} aria-controls={`tabpanel-${TABS.MARKET}`} />
								<Tab
									label="Interactive"
									id={`${TABS.INTERACTIVE}`}
									aria-controls={`tabpanel-${TABS.INTERACTIVE}`}
								/>
							</Tabs>
						</Box>
						<TabPanel index={TABS.MARKET} tab={currentTab}>
							<InvestMarket
								filteredList={filteredList}
								setFilteredList={setFilteredList}
								handleStart={handleStart}
								handleStop={handleStop}
								routeEnd={routeEnd}
							/>
						</TabPanel>
						<TabPanel index={TABS.INTERACTIVE} tab={currentTab}>
							<InteractiveStreamManager />
						</TabPanel>
					</Box>
				</div>

				<div>
					<span className={styles.fee_disclaimer}>{t('Ricochet takes a 2% fee on swaps.')}</span>
				</div>
			</div>
		</div>
	);
};
