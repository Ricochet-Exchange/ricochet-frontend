import { upgradeTokensList } from 'constants/upgradeConfig';
import Big from 'big.js';
import { Flow } from '../types/flow';
import { Coin } from '../constants/coins';

export function sortByColumn(
	sortedUpgradeTokensList: typeof upgradeTokensList,
	balances: { [key: string]: string } | undefined,
	geckoPriceList: {} | undefined,
	geckoMapping: {} | undefined,
	flows:
		| {
				flowsOwned: Flow[];
				flowsReceived: Flow[];
		  }
		| undefined,
	column: string,
	sortDirection: string,
) {
	let localSortedUpgradeTokensList = sortedUpgradeTokensList;
	let localSortDirection = sortDirection;
	const getWalletBalance = (token: any) =>
		token.coin === Coin.RIC ? 'NA' : balances && parseFloat(balances[token.tokenAddress]).toFixed(2);
	switch (column) {
		case 'currency':
			if (sortDirection === 'asc') {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) =>
					a.coin.toLowerCase() > b.coin.toLowerCase() ? 1 : -1,
				);
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'dsc';
			} else {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) =>
					a.coin.toLowerCase() < b.coin.toLowerCase() ? 1 : -1,
				);
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'asc';
			}
			break;
		case 'balance':
			if (sortDirection === 'asc') {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					const aBalance = getWalletBalance(a) || '0';
					const bBalance = getWalletBalance(b) || '0';
					return parseFloat(aBalance) > parseFloat(bBalance) ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'dsc';
			} else {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					const aBalance = getWalletBalance(a) || '0';
					const bBalance = getWalletBalance(b) || '0';
					return parseFloat(aBalance) < parseFloat(bBalance) ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'asc';
			}
			break;
		case 'superTokenBalance':
			if (sortDirection === 'asc') {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					const aBalance = balances ? balances[a.superTokenAddress] : '0';
					const bBalance = balances ? balances[b.superTokenAddress] : '0';
					return parseFloat(aBalance) > parseFloat(bBalance) ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'dsc';
			} else {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					const aBalance = balances ? balances[a.superTokenAddress] : '0';
					const bBalance = balances ? balances[b.superTokenAddress] : '0';
					return parseFloat(aBalance) < parseFloat(bBalance) ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'asc';
			}
			break;
		case 'superTokenBalanceInUSD':
			if (sortDirection === 'asc') {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					const aBalance =
						balances && geckoPriceList
							? parseFloat(balances[a.superTokenAddress]) *
							  parseFloat((geckoPriceList as any)[(geckoMapping as any)[a.coin]].usd)
							: '0';
					const bBalance =
						balances && geckoPriceList
							? parseFloat(balances[b.superTokenAddress]) *
							  parseFloat((geckoPriceList as any)[(geckoMapping as any)[b.coin]].usd)
							: '0';
					return aBalance > bBalance ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'dsc';
			} else {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					const aBalance =
						balances && geckoPriceList
							? parseFloat(balances[a.superTokenAddress]) *
							  parseFloat((geckoPriceList as any)[(geckoMapping as any)[a.coin]].usd)
							: '0';
					const bBalance =
						balances && geckoPriceList
							? parseFloat(balances[b.superTokenAddress]) *
							  parseFloat((geckoPriceList as any)[(geckoMapping as any)[b.coin]].usd)
							: '0';
					return aBalance < bBalance ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'asc';
			}
			break;
		case 'monthlyNetFlow':
			if (sortDirection === 'asc') {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					// For token a
					const usdPriceStringA = (geckoPriceList as any)[(geckoMapping as any)[a.coin]].usd;
					const usdPriceA = new Big(parseFloat(usdPriceStringA));
					let inFlowRateA = 0;
					const inFlowArrayA = flows?.flowsOwned?.filter(
						(flow: Flow) => flow.token.id === a.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (inFlowArrayA?.length || 0); i += 1) {
						if (inFlowArrayA !== undefined) inFlowRateA += parseInt(inFlowArrayA[i].flowRate, 10);
					}
					let inFlowA = new Big(inFlowRateA);
					inFlowA = inFlowA.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceA);

					let outFlowRateA = 0;
					const outFlowArrayA = flows?.flowsReceived?.filter(
						(flow: Flow) => flow.token.id === a.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (outFlowArrayA?.length || 0); i += 1) {
						if (outFlowArrayA !== undefined) {
							outFlowRateA += parseInt(outFlowArrayA[i].flowRate, 10);
						}
					}
					let outFlowA = new Big(outFlowRateA);
					outFlowA = outFlowA.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceA);

					const totalFlowOfTokenA = inFlowA.plus(outFlowA);
					// For token b
					const usdPriceStringB = (geckoPriceList as any)[(geckoMapping as any)[b.coin]].usd;
					const usdPriceB = new Big(parseFloat(usdPriceStringB));
					let inFlowRateB = 0;
					const inFlowArrayB = flows?.flowsOwned?.filter(
						(flow: Flow) => flow.token.id === b.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (inFlowArrayB?.length || 0); i += 1) {
						if (inFlowArrayB !== undefined) inFlowRateB += parseInt(inFlowArrayB[i].flowRate, 10);
					}
					let inFlowB = new Big(inFlowRateB);
					inFlowB = inFlowB.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceB);

					let outFlowRateB = 0;
					const outFlowArrayB = flows?.flowsReceived?.filter(
						(flow: Flow) => flow.token.id === b.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (outFlowArrayB?.length || 0); i += 1) {
						if (outFlowArrayB !== undefined) {
							outFlowRateB += parseInt(outFlowArrayB[i].flowRate, 10);
						}
					}
					let outFlowB = new Big(outFlowRateB);
					outFlowB = outFlowB.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceB);

					const totalFlowOfTokenB = inFlowB.plus(outFlowB);

					return totalFlowOfTokenA > totalFlowOfTokenB ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'dsc';
			} else {
				const sorted = [...sortedUpgradeTokensList].sort((a, b) => {
					// For token a
					const usdPriceStringA = (geckoPriceList as any)[(geckoMapping as any)[a.coin]].usd;
					const usdPriceA = new Big(parseFloat(usdPriceStringA));
					let inFlowRateA = 0;
					const inFlowArrayA = flows?.flowsOwned?.filter(
						(flow: Flow) => flow.token.id === a.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (inFlowArrayA?.length || 0); i += 1) {
						if (inFlowArrayA !== undefined) inFlowRateA += parseInt(inFlowArrayA[i].flowRate, 10);
					}
					let inFlowA = new Big(inFlowRateA);
					inFlowA = inFlowA.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceA);

					let outFlowRateA = 0;
					const outFlowArrayA = flows?.flowsReceived?.filter(
						(flow: Flow) => flow.token.id === a.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (outFlowArrayA?.length || 0); i += 1) {
						if (outFlowArrayA !== undefined) {
							outFlowRateA += parseInt(outFlowArrayA[i].flowRate, 10);
						}
					}
					let outFlowA = new Big(outFlowRateA);
					outFlowA = outFlowA.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceA);

					const totalFlowOfTokenA = inFlowA.plus(outFlowA);

					// For token b
					const usdPriceStringB = (geckoPriceList as any)[(geckoMapping as any)[b.coin]].usd;
					const usdPriceB = new Big(parseFloat(usdPriceStringB));
					let inFlowRateB = 0;
					const inFlowArrayB = flows?.flowsOwned?.filter(
						(flow: Flow) => flow.token.id === b.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (inFlowArrayB?.length || 0); i += 1) {
						if (inFlowArrayB !== undefined) inFlowRateB += parseInt(inFlowArrayB[i].flowRate, 10);
					}
					let inFlowB = new Big(inFlowRateB);
					inFlowB = inFlowB.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceB);

					let outFlowRateB = 0;
					const outFlowArrayB = flows?.flowsReceived?.filter(
						(flow: Flow) => flow.token.id === b.superTokenAddress.toLowerCase(),
					);
					for (let i = 0; i < (outFlowArrayB?.length || 0); i += 1) {
						if (outFlowArrayB !== undefined) {
							outFlowRateB += parseInt(outFlowArrayB[i].flowRate, 10);
						}
					}
					let outFlowB = new Big(outFlowRateB);
					outFlowB = outFlowB.times(new Big('2592000')).div(new Big('10e17')).times(usdPriceB);

					const totalFlowOfTokenB = inFlowB.plus(outFlowB);

					return totalFlowOfTokenA < totalFlowOfTokenB ? 1 : -1;
				});
				localSortedUpgradeTokensList = sorted;
				localSortDirection = 'asc';
			}
			break;
		default:
			break;
	}

	return {
		localSortedUpgradeTokensList,
		localSortDirection,
	};
}
