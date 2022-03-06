import { Coin } from 'constants/coins';
import { tokenCoinTransformer } from 'constants/tokenCoinMap';

export const getTokenName = (token: string): Coin | undefined => {
  const isTokenExisted = tokenCoinTransformer.find(
    ({ token: t }) => t.toLowerCase() === token.toLowerCase(),
  );

  if (isTokenExisted) {
    return isTokenExisted.coin;
  }

  console.log(`Token ${token} is not supported on Ricochet platform.`);
};
