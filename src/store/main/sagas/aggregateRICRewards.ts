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
		[twoWayusdcWethFlowQuery, '0xF1748222B08193273fd34FF10A28352A2C25Adb0'],
		[twoWayusdcWbtcFlowQuery, '0x11Bfe0ff11819274F0FD57EFB4fc365800792D54'],
		[twoWayIbUsdIbBTCFlowQuery, '0xbB5C64B929b1E60c085dcDf88dfe41c6b9dcf65B'],
		[twoWayIbUsdIbEthFlowQuery, '0x56aCA122d439365B455cECb14B4A39A9d1B54621'],
		[twoWayUsdcMaticFlowQuery, '0xF989C73d04D20c84d6A4D26d07090D0a63F021C7'],
		[usdcxibAlluoUSDFlowQuery, '0xE53dd10d49C8072d68d48c163d9e1A219bd6852D'],
		[twoWayDaiWethFlowQuery, '0xB44B371A56cE0245ee961BB8b4a22568e3D32874'],
	];

	console.log('marketsArray', marketsArray, 'main', main, 'web3', web3);

	let newReward = 0;

	let emission = '';

	if (!web3) {
		return;
	}

	marketsArray.map((market: any[]) => {
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
