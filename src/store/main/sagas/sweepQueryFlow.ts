import { call, all, put } from 'redux-saga/effects';
import { RICAddress } from 'constants/polygon_config';
import { Unwrap } from 'types/unwrap';
import { getAddress } from 'utils/getAddress';
import { queryFlows } from 'api';
import { getReceviedFlows } from 'utils/getReceviedFlows';
import { getOwnedFlows } from 'utils/getOwnedFlows';
import { Flow } from 'types/flow';

import { flowConfig, FlowEnum } from 'constants/flowConfig';
import { streamExchangeABI, erc20ABI } from 'constants/abis'; 
import { getContract } from 'utils/getContract';

import { mainSetState } from '../actionCreators';

const exchangeContractsAddresses = flowConfig.map((f) => f.superToken);

export function* sweepQueryFlow() {
  const address: Unwrap<typeof getAddress> = yield call(getAddress);
  const results: any[] = yield all(exchangeContractsAddresses.map(
    (addr) => call(queryFlows, addr),
  ));

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
    const contract = getContract(exchangeContract, streamExchangeABI);
    const subsidyRate = await contract.methods.getSubsidyRate().call();
    
    const subsidyRateTotal = (subsidyRate * 30 * 24 * 60 * 60) / 1e18;
    const subsidyRatePerso = (subsidyRateTotal * outgoing) / totalFlow;

    const RIC = getContract(RICAddress, erc20ABI);
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
      subsidyRate, // await getSubsidyRate(FlowEnum.daiMkrFlowQuery, 
      // usdcRicPlaceholder, flowsOwned),
    };
  }
  
  const usdcRicFlowQuery = buildFlowQuery(FlowEnum.usdcRicFlowQuery);
  const daiEthFlowQuery = buildFlowQuery(FlowEnum.daiEthFlowQuery);
  const ethDaiFlowQuery = buildFlowQuery(FlowEnum.ethDaiFlowQuery);
  const daiMkrFlowQuery = buildFlowQuery(FlowEnum.daiMkrFlowQuery);
  const mkrDaiFlowQuery = buildFlowQuery(FlowEnum.mkrDaiFlowQuery);
  const usdcMkrFlowQuery = buildFlowQuery(FlowEnum.usdcMkrFlowQuery);
  const mkrUsdcFlowQuery = buildFlowQuery(FlowEnum.mkrUsdcFlowQuery);
  const daiMaticFlowQuery = buildFlowQuery(FlowEnum.daiMaticFlowQuery);
  const maticDaiFlowQuery = buildFlowQuery(FlowEnum.maticDaiFlowQuery);
  const usdcMaticFlowQuery = buildFlowQuery(FlowEnum.usdcMaticFlowQuery);
  const maticUsdcFlowQuery = buildFlowQuery(FlowEnum.maticUsdcFlowQuery);
  const usdcWethFlowQuery = buildFlowQuery(FlowEnum.usdcWethFlowQuery);
  const usdcWbtcFlowQuery = buildFlowQuery(FlowEnum.usdcWbtcFlowQuery);
  const wethUsdcFlowQuery = buildFlowQuery(FlowEnum.wethUsdcFlowQuery);
  const wbtcUsdcFlowQuery = buildFlowQuery(FlowEnum.wbtcUsdcFlowQuery);
  const usdcSlpFlowQuery = buildFlowQuery(FlowEnum.usdcSlpFlowQuery);
  
  function getSubsidyRateFromQuery(query:any) {
    return getSubsidyRate(
      query.flowKey, query.placeholder, query.flowsOwned,
    );
  }
  // WORKING
  // usdcRicFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcRicFlowQuery);
  daiEthFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, daiEthFlowQuery);
  ethDaiFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, ethDaiFlowQuery);
  daiMkrFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, daiMkrFlowQuery);
  mkrDaiFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, mkrDaiFlowQuery);
  usdcMkrFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcMkrFlowQuery);
  mkrUsdcFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, mkrUsdcFlowQuery);
  daiMaticFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, daiMaticFlowQuery);
  maticDaiFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, maticDaiFlowQuery);
  usdcMaticFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcMaticFlowQuery);
  maticUsdcFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, maticUsdcFlowQuery);
  usdcWethFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcWethFlowQuery);
  usdcWbtcFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcWbtcFlowQuery);
  wethUsdcFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, wethUsdcFlowQuery);
  wbtcUsdcFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, wbtcUsdcFlowQuery);
  usdcSlpFlowQuery.subsidyRate = yield call(getSubsidyRateFromQuery, usdcSlpFlowQuery);
  
  yield put(mainSetState({
    usdcRicFlowQuery,
    daiEthFlowQuery,
    ethDaiFlowQuery,
    daiMkrFlowQuery,
    mkrDaiFlowQuery,
    usdcMkrFlowQuery,
    mkrUsdcFlowQuery,
    daiMaticFlowQuery,
    maticDaiFlowQuery,
    usdcMaticFlowQuery,
    maticUsdcFlowQuery,
    usdcWethFlowQuery,
    usdcWbtcFlowQuery,
    wethUsdcFlowQuery,
    wbtcUsdcFlowQuery,
    usdcSlpFlowQuery,
  }));
}
