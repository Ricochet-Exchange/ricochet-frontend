import {
  DAIxAddress,
  MATICxAddress,
  MKRxAddress,
  USDCxAddress,
  WBTCxAddress,
  WETHxAddress,
} from '../constants/polygon_config';

const coingeckoIds = new Map<string, string>([
  [DAIxAddress, 'dai'],
  [USDCxAddress, 'usd-coin'],
  [WETHxAddress, 'weth'],
  [WBTCxAddress, 'wrapped-bitcoin'],
  [MATICxAddress, 'matic-network'],
  [MKRxAddress, 'maker'],
]);

async function getPrices() {
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

export const getCoingeckoPrices = async (): Promise<{ [key:string]: number }> => {
  const tokenAddresses = [...coingeckoIds.keys()];
  const coingeckoPrices: { [key:string]: number } = {};

  await getPrices().then((response:any) => {
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
  return coingeckoPrices;
};
