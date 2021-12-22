import { put, call } from 'redux-saga/effects';
import { fromWei } from 'utils/balances';
import {
  rexLPETHAddress,
  rexLPIDLEAddress,
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
import { getContract } from 'utils/getContract';
import { erc20ABI } from 'constants/abis';
import { makeBatchRequest } from 'utils/makeBatchRequest';
import web3 from 'utils/web3instance';
import { mainSetState } from '../actionCreators';

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
    RICAddress, rexLPETHAddress, rexLPIDLEAddress,
  ];

  const coingeckoIds = new Map<string, string>([
    [DAIAddress, 'dai'],
    [USDCAddress, 'usd-coin'],
    [WETHAddress, 'weth'],
    [WBTCAddress, 'wrapped-bitcoin'],
    [WMATICAddress, 'matic-network'],
    [MKRAddress, 'maker'],
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

  const contracts = contractsAddress.map((el) => getContract(el, erc20ABI));
  const requests = contracts.map((el) => el.methods.balanceOf(address).call);
  const results: string[] = yield call(makeBatchRequest, requests);
  const balances: { [key:string]: string } = {};
  contractsAddress.map((el:string, i:number) => {
    // TODO: Use decimals() method instead of hardcoded
    if (el === WBTCAddress) {
      balances[el] = fromWei(results[i], 8);
    } else if (el === USDCAddress) {
      balances[el] = fromWei(results[i], 6);
    } else {
      balances[el] = fromWei(results[i], 18);
    }
    return null;
  });
  // Edit matic balance
  balances[WMATICAddress] = fromWei(yield web3.eth.getBalance(address), 18);

  yield put(mainSetState({ balances, coingeckoPrices }));
}
