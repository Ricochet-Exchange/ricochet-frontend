import React, { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { TextInput } from 'components/common/TextInput';
import { PanelChange } from 'components/layout/PanelChange';
import { useTranslation } from 'react-i18next';
import { ExchangeKeys } from 'utils/getExchangeAddress';
import styles from './styles.module.scss';
import { flowConfig, FlowEnum, InvestmentFlow, RoutesToFlowTypes } from 'constants/flowConfig';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain, selectUserStreams } from 'store/main/selectors';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addReward } from 'store/main/actionCreators';
import { getContract } from 'utils/getContract';
import { rexReferralAddress } from 'constants/polygon_config';
import { referralABI, streamExchangeABI } from 'constants/abis';
import { AFFILIATE_STATUS, getAffiliateStatus } from 'utils/getAffiliateStatus';
import { useLocation, useHistory } from 'react-router-dom';

type InvestMarketProps = {
	handleStart: any;
	handleStop: any;
};

export const InvestMarket: FC<InvestMarketProps> = ({ handleStart, handleStop }) => {
	const { t } = useTranslation();
	const state = useShallowSelector(selectMain);
	const { web3, address } = useShallowSelector(selectMain);
	const userStreams = useShallowSelector(selectUserStreams);
	const { balances, isLoading, coingeckoPrices } = state;
	const [filteredList, setFilteredList] = useState(flowConfig);
	const [aggregatedRewards, setAggregatedRewards] = useState<number[]>([]);
	const { aggregatedRICRewards } = useShallowSelector(selectMain);

	const history = useHistory();

	const contract = getContract(rexReferralAddress, referralABI, web3);
	const [search, setSearch] = useState('');
	const match = useRouteMatch();
	const location = useLocation();
	const [emissionRate, setEmissionRate] = useState('');
	const [isAffiliate, setIsAffiliate] = useState(false);
	const dispatch = useDispatch();
	const flowType = RoutesToFlowTypes[match.path];

	useEffect(() => {
		if (flowType) {
			let sortedList = flowConfig.filter((each) => each.type === flowType);
			sortedList = sortedList.sort((a, b) => {
				const totalVolumeA = parseFloat(getFlowUSDValue(a));
				const totalVolumeB = parseFloat(getFlowUSDValue(b));
				return totalVolumeB - totalVolumeA;
			});
			setFilteredList(sortedList);
		} else {
			const sortedUserStreams = userStreams.sort((a, b) => {
				const flowA = parseFloat(state[a.flowKey]?.placeholder || '0');
				const flowB = parseFloat(state[b.flowKey]?.placeholder || '0');
				return flowB - flowA;
			});
			setFilteredList(sortedUserStreams);
		}
	}, [flowType, state, userStreams]);

	const handleSearch = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { value } = e.target;
			setSearch(value);
			const filtered = flowConfig.filter(
				(el) =>
					el.coinA.toUpperCase().includes(value.toUpperCase()) ||
					el.coinB.toUpperCase().includes(value.toUpperCase()),
			);
			setFilteredList(filtered);
		},
		[setFilteredList],
	);

	function sumStrings(a: number, b: string): number {
		return a + parseFloat(b);
	}
	function endDate(bal: number, outgoing: number): string {
		const outgoingPerMs = outgoing / (30 * 24 * 60 * 60 * 1000);
		const endDateTimestamp = Date.now() + bal / outgoingPerMs;
		const endDateStr = new Date(endDateTimestamp).toLocaleDateString();
		return `${endDateStr}`;
	}

	function retrieveEndDate(flowKey: FlowEnum, currentState: any, currentBalances: any) {
		const flow = flowConfig.find((flow_) => flow_.flowKey === flowKey);
		const sameCoinAFlows = flowConfig.filter((flow_) => flow_.coinA === flow?.coinA);
		const outgoing = sameCoinAFlows.map((flow_) => currentState[flow_.flowKey]?.placeholder || '0');
		const outgoingSum = outgoing.reduce(sumStrings, 0);
		const bal = parseFloat((currentBalances && currentBalances[flow?.tokenA || '']) || '0');
		return endDate(bal, outgoingSum);
	}
	function computeStreamEnds(currentState: any, currentBalances: any) {
		const streamEnds: { [id: string]: string } = {};
		Object.values(FlowEnum).forEach((flowEnum: FlowEnum) => {
			streamEnds[flowEnum] = retrieveEndDate(flowEnum, currentState, currentBalances);
		});
		return streamEnds;
	}

	const streamEnds = computeStreamEnds(state, balances);

	function getFlowUSDValue(flow: InvestmentFlow, toFixed: number = 0) {
		return (
			coingeckoPrices ? parseFloat(state[flow.flowKey]?.flowsOwned as string) * coingeckoPrices[flow.tokenA] : 0
		).toFixed(toFixed);
	}

	const handleSetAggregatedRewards = (reward_amount: number) => {
		setAggregatedRewards((aggregatedRewards) => [...aggregatedRewards, reward_amount]);
	};

	useEffect(() => {
		let aggregated = 0;
		console.log('history', history);
		aggregatedRewards.forEach((reward) => {
			aggregated = aggregated + reward;
		});
		if (aggregatedRICRewards && +aggregatedRICRewards !== aggregated) {
			console.log('sol', location);

			dispatch(addReward(`${aggregated}`));
		}
	}, [aggregatedRewards]);

	const contractAddressAllowed = (address: string) => {
		const eligibleAddresses = [
			'0x56aCA122d439365B455cECb14B4A39A9d1B54621',
			'0xE53dd10d49C8072d68d48c163d9e1A219bd6852D',
			'0xbB5C64B929b1E60c085dcDf88dfe41c6b9dcf65B',
			'0xF1748222B08193273fd34FF10A28352A2C25Adb0',
			'0x11Bfe0ff11819274F0FD57EFB4fc365800792D54',
			'0xB44B371A56cE0245ee961BB8b4a22568e3D32874',
			'0xF989C73d04D20c84d6A4D26d07090D0a63F021C7',
		];
		if (eligibleAddresses.includes(address)) {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {
		console.log('made here');
		let total = 0;

		filteredList?.map((element) => {
			let isMounted = true;

			if (address && contract) {
				(async () => {
					const affiliateStatus = await getAffiliateStatus(contract, address, web3);

					if (isMounted && affiliateStatus === AFFILIATE_STATUS.ENABLED) {
						setIsAffiliate(true);
					}
					if (contractAddressAllowed(element.superToken)) {
						const marketContract = getContract(element.superToken, streamExchangeABI, web3);

						marketContract.methods
							.getOutputPool(3)
							.call()
							.then((res: any) => {
								const finRate = ((Number(res.emissionRate) / 1e18) * 2592000).toFixed(4);
								setEmissionRate(finRate.toString());
							})
							.catch((error: any) => {
								console.log('error', error);
							});
					}
				})();
			}

			let personal_pool_rate = state[element.flowKey]?.placeholder;
			let total_market_pool = state[element.flowKey]?.flowsOwned;
			let date =
				new Date().toLocaleDateString().split('/').reverse().join('') >=
				(state[element.flowKey]?.subsidyRate.endDate.split('/').reverse().join('') || '0');
			let subsidyRate = date ? state[element.flowKey]?.subsidyRate : undefined;

			if (!personal_pool_rate || !total_market_pool) {
				return;
			}

			const subsidy_rate = (+personal_pool_rate / +total_market_pool) * 100;
			const received_reward = (+subsidy_rate / 100) * +emissionRate;
			console.log('test', received_reward);
		});
	}, [filteredList]);

	return (
		<>
			<div className={styles.input_wrap}>
				<TextInput
					value={search}
					placeholder={t('Search by Name')}
					onChange={handleSearch}
					className={styles.input}
					containerClassName={styles.container_input}
					left={<FontIcon name={FontIconName.Search} className={styles.search} size={16} />}
				/>
			</div>

			<div className={styles.headers}>
				<div className={styles.market}>{t('Stream Market')}</div>
				<div className={styles.stream}>{t('Your Stream')}</div>
				<div className={styles.balances}>{t('Your Balances')}</div>
				<div className={styles.streaming}>{t('Total Value Streaming')}</div>
				<div className={styles.ends}>{t('')}</div>
			</div>
			<div className={styles.content}>
				{filteredList.map((element, idx) => (
					<div className={styles.panel} key={`${element.coinA}-${element.coinB}-${element.flowKey}`}>
						<PanelChange
							placeholder={t('Input Rate')}
							onClickStart={handleStart(element)}
							onClickStop={handleStop(element)}
							coinA={element.coinA}
							coingeckoPrice={coingeckoPrices ? coingeckoPrices[element.tokenA] : 0}
							coinB={element.coinB}
							tokenA={element.tokenA}
							tokenB={element.tokenB}
							balanceA={balances && balances[element.tokenA]}
							balanceB={balances && balances[element.tokenB]}
							totalFlow={state[element.flowKey]?.flowsOwned}
							totalFlows={state[element.flowKey]?.totalFlows}
							streamEnd={streamEnds[element.flowKey]}
							subsidyRate={
								new Date().toLocaleDateString().split('/').reverse().join('') >=
								(state[element.flowKey]?.subsidyRate.endDate.split('/').reverse().join('') || '0')
									? undefined
									: state[element.flowKey]?.subsidyRate
							}
							personalFlow={state[element.flowKey]?.placeholder}
							mainLoading={isLoading}
							flowType={element.type}
							isReadOnly={state.isReadOnly}
							contractAddress={element.superToken}
							exchangeKey={element.flowKey.replace('FlowQuery', '') as ExchangeKeys}
							indexVal={idx}
							streamedSoFar={state[element.flowKey]?.streamedSoFar}
							receivedSoFar={state[element.flowKey]?.receivedSoFar}
							aggregateRewards={handleSetAggregatedRewards}
						/>
					</div>
				))}
			</div>

			{filteredList.length === 0 && (
				<div className={styles.empty_state}>
					<FontIcon name={FontIconName.Search} size={30} />
					<span className={styles.empty_state_text}>
						<div>{t('No results found')}</div>
					</span>
				</div>
			)}
		</>
	);
};
