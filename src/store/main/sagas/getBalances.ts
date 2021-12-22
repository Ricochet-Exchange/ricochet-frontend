import { put, call, select } from 'redux-saga/effects';
import { fromWei } from 'utils/balances';
import {
  rexLPETHAddress,
  USDCxAddress,
  USDCAddress,
  DAIxAddress,
  DAIAddress,
  MATICxAddress,
  WMATICAddress,
  SUSHIxAddress,
  SUSHIAddress,
  MKRxAddress,
  MKRAddress,
  WETHxAddress,
  WETHAddress,
  WBTCxAddress,
  WBTCAddress,
  IDLExAddress,
  IDLEAddress,
  RICAddress,
} from 'constants/polygon_config';
import { makeBatchRequest } from 'utils/makeBatchRequest';
import { mainSetState } from '../actionCreators';
import { selectMain } from '../selectors';

export function* getBalances(address: string) {
  const contractsAddress = [
    DAIxAddress, DAIAddress,
    MKRxAddress, MKRAddress,
    MATICxAddress, WMATICAddress,
    SUSHIxAddress, SUSHIAddress,
    USDCxAddress, USDCAddress,
    WETHxAddress, WETHAddress,
    WBTCxAddress, WBTCAddress,
    IDLExAddress, IDLEAddress,
    RICAddress, rexLPETHAddress,
  ];

  const coingeckoIds = new Map<string, string>([
    [DAIxAddress, 'dai'],
    [USDCxAddress, 'usd-coin'],
    [WETHxAddress, 'weth'],
    [WBTCxAddress, 'wrapped-bitcoin'],
    [MATICxAddress, 'matic-network'],
    [MKRxAddress, 'maker'],
  ]);

  async function getCoingeckoRates() {
    const ids = [...coingeckoIds.values()];
    const coingeckoRequestUrl =
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=${ids.join(',')}`;
    return fetch(coingeckoRequestUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseData) => responseData)
      .catch((error) => console.error(error));
  }

  const tokenAddresses = [...coingeckoIds.keys()];
  const coingeckoPrices: { [key:string]: number } = {};

  getCoingeckoRates().then((response:any) => {
    tokenAddresses.forEach((tokenAddress) => {
      const id = coingeckoIds?.get(tokenAddress);
      const tokenData = response.filter((res:any) => res.id === id!);
      if (tokenData === undefined) {
        coingeckoPrices[tokenAddress] = 0;
        console.warn('Could not fetch price for token ', tokenAddress);
      } else {
        coingeckoPrices[tokenAddress] = tokenData[0].current_price;
      }
    });
  });

  const main: ReturnType<typeof selectMain> = yield select(selectMain);
  const { web3 } = main;
  const requests = contractsAddress.map((el) => ({
    target: el,
    call: ['balanceOf(address)(uint256)', address],
    returns: [[el, (result: string) => {
      if (el === WBTCAddress) {
        return fromWei(result, 8);
      } if (el === USDCAddress) {
        return fromWei(result, 6);
      } 
      return fromWei(result, 18);
    }]],
  }));
 
  const results: string[] = yield call(makeBatchRequest, requests, web3);
  const balances: { [key:string]: string } = {};
  Object.entries(results).forEach((entry:[string, string]) => {
    // TODO: Use decimals() method instead of hardcoded
    Object.assign(balances, { [entry[0]]: entry[1] });
  });

  // Edit matic balance
  balances[WMATICAddress] = fromWei(yield web3.eth.getBalance(address), 18);

  yield put(mainSetState({ balances, coingeckoPrices }));
}
