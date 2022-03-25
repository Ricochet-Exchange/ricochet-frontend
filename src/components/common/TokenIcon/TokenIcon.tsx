import React, { FC } from 'react';
import Image from 'next/image';
import { Coin, iconsCoin } from 'constants/coins';
import currency from 'assets/images/coins/currency.svg';

type TokenIconProps = {
  tokenName: Coin | undefined;
};

export const TokenIcon: FC<TokenIconProps> = ({ tokenName }) => (
  <Image
    src={tokenName ? iconsCoin[tokenName] : currency}
    alt={tokenName}
    width="24"
    height="24"
  />
);
