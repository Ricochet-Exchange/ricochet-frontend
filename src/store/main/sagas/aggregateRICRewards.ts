import { select, put } from 'redux-saga/effects';
import { selectMain } from '../selectors';
import { streamExchangeABI } from 'constants/abis';
import { getContract } from 'utils/getContract';
import { mainSetState } from '../actionCreators';

export function* aggregatedRICRewards(value: string) {
	const main: ReturnType<typeof selectMain> = yield select(selectMain);

	const aggregatedRewards = '0';

	const {
		twoWayusdcWethFlowQuery,
		twoWayusdcWbtcFlowQuery,
		twoWayIbUsdIbBTCFlowQuery,
		twoWayIbUsdIbEthFlowQuery,
		twoWayUsdcMaticFlowQuery,
		usdcxibAlluoUSDFlowQuery,
		twoWayDaiWethFlowQuery,
		web3,
	} = main;

	const marketsArray = [
		[twoWayusdcWethFlowQuery, '0x8082Ab2f4E220dAd92689F3682F3e7a42b206B42'],
		[twoWayusdcWbtcFlowQuery, '0xe0A0ec8dee2f73943A6b731a2e11484916f45D44'],
		[twoWayIbUsdIbBTCFlowQuery, '0xbB5C64B929b1E60c085dcDf88dfe41c6b9dcf65B'],
		[twoWayIbUsdIbEthFlowQuery, '0x56aCA122d439365B455cECb14B4A39A9d1B54621'],
		[twoWayUsdcMaticFlowQuery, '0xE093D8A4269CE5C91cD9389A0646bAdAB2c8D9A3'],
		[usdcxibAlluoUSDFlowQuery, '0xE53dd10d49C8072d68d48c163d9e1A219bd6852D'],
		[twoWayDaiWethFlowQuery, '0x9BEf427fa1fF5269b824eeD9415F7622b81244f5'],
	];

	console.log('marketsArray', marketsArray, 'main', main, 'web3', web3);

	let newReward = 0;

	let emission = '';

	if (!web3) {
		return;
	}

	marketsArray.map((market) => {
		const marketContract = getContract(market[1], streamExchangeABI, web3);

		marketContract.methods
			.getOutputPool(3)
			.call()
			.then((res: any) => {
				const finRate = ((Number(res.emissionRate) / 1e18) * 2592000).toFixed(4);
				emission = finRate.toString();
				console.log('finRate', finRate);
			})
			.catch((error: any) => {
				console.log('error', error);
			});
	});

	yield put(mainSetState({ aggregatedRICRewards: `${newReward}` }));
}
