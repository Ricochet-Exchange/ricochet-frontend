import { Coin } from 'constants/coins';
import { tokenCoinTransformer } from 'constants/tokenCoinMap';

export const getTokenName = (token: string): Coin => {
  const isTokenExisted = tokenCoinTransformer.find(
    ({ token: t }) => t.toLowerCase() === token.toLowerCase(),
  );

  if (isTokenExisted) {
    return isTokenExisted.coin;
  }

  console.warn(`Token ${token} is not supported`);
  return 'UNKNOWN' as Coin;
};
