import {
  all, call, put, select,
} from 'redux-saga/effects';
import { RICAddress } from 'constants/polygon_config';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { queryFlows, queryStreams } from 'api';

import { getReceviedFlows } from 'utils/getReceviedFlows';
import { getOwnedFlows } from 'utils/getOwnedFlows';
import { Flow } from 'types/flow';

import { flowConfig, FlowEnum } from 'constants/flowConfig';
import { erc20ABI } from 'constants/abis';
import { getContract } from 'utils/getContract';

import { mainSetState } from '../actionCreators';
import { selectMain } from '../selectors';
import calculateStreamedSoFar from '../../../pages/InvestPage/utils/calculateStreamedSoFar';

const exchangeContractsAddresses = flowConfig.map((f) => f.superToken);

export function* sweepQueryFlow() {
  const main: ReturnType<typeof selectMain> = yield select(selectMain);
  const { web3 } = main;
  const address: Unwrap<typeof getAddress> = yield call(getAddress, web3);
  const results: any[] = yield all(exchangeContractsAddresses.map(
    (addr) => call(queryFlows, addr),
  ));
  const response: Unwrap<typeof queryStreams> = yield call(queryStreams, address);
  const streamedSoFarMap: { [key:string]: number } = {};
  (response?.data?.data?.streams || [])
    .forEach((stream:any) => {
      const streamedSoFar = streamedSoFarMap[`${stream.token.id}-${stream.receiver.id}`] || 0;
      Object.assign(streamedSoFarMap, {
        [`${stream.token.id}-${stream.receiver.id}`]: Number(streamedSoFar) + Number(calculateStreamedSoFar(
          stream.streamedUntilUpdatedAt,
          stream.updatedAtTimestamp,
          stream.currentFlowRate,
        )),
      });
    });

  const flows: { [key:string]: { flowsOwned: Flow[], flowsReceived: Flow[] } } = {};
  exchangeContractsAddresses.forEach((el, i) => {
    if (results[i].data.data.account != null) {
      flows[el] = results[i].data.data.account;
    } else {
      flows[el] = { flowsOwned: [], flowsReceived: [] };
    }
  });

  // load abi, create contract instance, get subsidy rate, return
  async function getSubsidyRate(flowKey:string, placeholder:string,
    flowsOwned:string): Promise< { perso:number, total:number, endDate:string }> {
    const flow = flowConfig.find((flow_) => flow_.flowKey === flowKey);
    const outgoing = parseFloat(placeholder);
    const totalFlow = parseFloat(flowsOwned);
    const exchangeContract = flow?.superToken || '0';
    // const contract = getContract(exchangeContract, streamExchangeABI, web3);
    // NOTE: getSubsidyRate no longer exists, no longer 1 subsidy rate/contract
    const subsidyRate = 0;
    const subsidyRateTotal = (subsidyRate * 30 * 24 * 60 * 60) / 1e18;
    const subsidyRatePerso = (subsidyRateTotal * outgoing) / totalFlow;
    const RIC = getContract(RICAddress, erc20ABI, web3);
    const exchangeContractRic = await RIC.methods.balanceOf(exchangeContract).call();
    const endDateTimestamp = Date.now() + (exchangeContractRic / subsidyRate) * 1000;
    const endDate = (new Date(endDateTimestamp)).toLocaleDateString();

    // const subsidyTokenAddr = await contract.methods.getSubsidyToken().call();
    // const subsidyToken = (subsidyTokenAddr.toLowerCase() === RICAddress.toLowerCase()) ?
    //   'RIC' :
    //   downgradeTokensList.find(
    //     (t:any) => t.tokenAddress.toLowerCase() === subsidyTokenAddr.toLowerCase(),
    //   );
    // const subsidyRates = `${subsidyRatePerso.toFixed(3)} ${subsidyToken}/mo.
    //     (out of ${(subsidyRateTotal / 1e3).toFixed(0)} kRIC/mo. total pooled) for ${flowKey}`;
    // console.log(subsidyRates);

    return { perso: subsidyRatePerso, total: subsidyRateTotal, endDate };
  }

  function buildFlowQuery(flowKey:string) {
    const flowConfigObject = flowConfig.find((o) => o.flowKey === flowKey);
    const exchangeAddress = flowConfigObject?.superToken || '';
    const tokenAxAddress = flowConfigObject?.tokenA || '';
    const tokenAtokenBFlows = flows[exchangeAddress];
    const tokenAtokenBFlowsReceived = getReceviedFlows(tokenAtokenBFlows.flowsReceived,
      tokenAxAddress, address);
    const streamedSoFar = streamedSoFarMap[`${tokenAxAddress.toLowerCase()}-${exchangeAddress.toLowerCase()}`];
    const tokenAtokenBPlaceholder = ((tokenAtokenBFlowsReceived / 10 ** 18) *
      (30 * 24 * 60 * 60)).toFixed(6);
    const flowsOwned = getOwnedFlows(tokenAtokenBFlows.flowsReceived, tokenAxAddress);
    const subsidyRate = { perso: 0, total: 0, endDate: 'unknown' };
    /*
    getSubsidyRate(flowKey, tokenAtokenBPlaceholder, flowsOwned)
      .then((p) => { subsidyRate = p; });
    */
    return {
      flowKey,
      flowsReceived: tokenAtokenBFlowsReceived,
      flowsOwned,
      totalFlows: tokenAtokenBFlows.flowsReceived.length,
      placeholder: tokenAtokenBPlaceholder,
      streamedSoFar,
      subsidyRate, // await getSubsidyRate(FlowEnum.daiMkrFlowQuery,
      // usdcRicPlaceholder, flowsOwned),
    };
  }

  const usdcRicFlowQuery = buildFlowQuery(FlowEnum.usdcRicFlowQuery);
  // const daiEthFlowQuery = buildFlowQuery(FlowEnum.daiEthFlowQuery);
  // const ethDaiFlowQuery = buildFlowQuery(FlowEnum.ethDaiFlowQuery);
  // const daiMkrFlowQuery = buildFlowQuery(FlowEnum.daiMkrFlowQuery);
  // const mkrDaiFlowQuery = buildFlowQuery(FlowEnum.mkrDaiFlowQuery);
  // const usdcMkrFlowQuery = buildFlowQuery(FlowEnum.usdcMkrFlowQuery);
  // const mkrUsdcFlowQuery = buildFlowQuery(FlowEnum.mkrUsdcFlowQuery);
  // const daiMaticFlowQuery = buildFlowQuery(FlowEnum.daiMaticFlowQuery);
  // const maticDaiFlowQuery = buildFlowQuery(FlowEnum.maticDaiFlowQuery);
  // const usdcMaticFlowQuery = buildFlowQuery(FlowEnum.usdcMaticFlowQuery);
  // const maticUsdcFlowQuery = buildFlowQuery(FlowEnum.maticUsdcFlowQuery);
  const twoWayusdcWethFlowQuery = buildFlowQuery(FlowEnum.twoWayusdcWethFlowQuery);
  const twoWayusdcWbtcFlowQuery = buildFlowQuery(FlowEnum.twoWayusdcWbtcFlowQuery);
  const twoWaywethUsdcFlowQuery = buildFlowQuery(FlowEnum.twoWaywethUsdcFlowQuery);
  const twoWaywbtcUsdcFlowQuery = buildFlowQuery(FlowEnum.twoWaywbtcUsdcFlowQuery);
  // const usdcSlpEthFlowQuery = buildFlowQuery(FlowEnum.usdcSlpEthFlowQuery);
  // const usdcIdleFlowQuery = buildFlowQuery(FlowEnum.usdcIdleFlowQuery);

  function getSubsidyRateFromQuery(query:any) {
    return getSubsidyRate(
      query.flowKey, query.placeholder, query.flowsOwned,
    );
  }
  // WORKING
  usdcRicFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcRicFlowQuery);
  // daiEthFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, daiEthFlowQuery);
  // ethDaiFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, ethDaiFlowQuery);
  // daiMkrFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, daiMkrFlowQuery);
  // mkrDaiFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, mkrDaiFlowQuery);
  // usdcMkrFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcMkrFlowQuery);
  // mkrUsdcFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, mkrUsdcFlowQuery);
  // daiMaticFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, daiMaticFlowQuery);
  // maticDaiFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, maticDaiFlowQuery);
  // usdcMaticFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcMaticFlowQuery);
  // maticUsdcFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, maticUsdcFlowQuery);
  twoWayusdcWethFlowQuery.subsidyRate =
      yield call(getSubsidyRateFromQuery, twoWayusdcWethFlowQuery);
  twoWayusdcWbtcFlowQuery.subsidyRate =
      yield call(getSubsidyRateFromQuery, twoWayusdcWbtcFlowQuery);
  twoWaywethUsdcFlowQuery.subsidyRate =
      yield call(getSubsidyRateFromQuery, twoWaywethUsdcFlowQuery);
  twoWaywbtcUsdcFlowQuery.subsidyRate =
      yield call(getSubsidyRateFromQuery, twoWaywbtcUsdcFlowQuery);
  // usdcSlpEthFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcSlpEthFlowQuery);
  // usdcIdleFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcIdleFlowQuery);

  yield put(mainSetState({
    usdcRicFlowQuery,
    // daiEthFlowQuery,
    // ethDaiFlowQuery,
    // daiMkrFlowQuery,
    // mkrDaiFlowQuery,
    // usdcMkrFlowQuery,
    // mkrUsdcFlowQuery,
    // daiMaticFlowQuery,
    // maticDaiFlowQuery,
    // usdcMaticFlowQuery,
    // maticUsdcFlowQuery,
    twoWayusdcWethFlowQuery,
    twoWayusdcWbtcFlowQuery,
    twoWaywethUsdcFlowQuery,
    twoWaywbtcUsdcFlowQuery,
    // usdcSlpEthFlowQuery,
    // usdcIdleFlowQuery,
  }));
}
