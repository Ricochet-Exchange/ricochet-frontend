import { Token } from '@uniswap/sdk-core';
import {
  DAIxAddress,
  USDCxAddress,
  WETHxAddress,
  MKRxAddress,
  WBTCxAddress,
  MATICxAddress,
  SUSHIxAddress,
  IDLExAddress,
} from 'constants/polygon_config';

export const getUnderlyingSupertoken = (Supertoken: string) => {
  const MATIC = new Token(
    137, // chainID
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
    18, // decimals
  );

  const USDC = new Token(
    137,
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    18,
  );
  
  const DAI = new Token(
    137, // chainID
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
    18, // decimals
  );

  const MKR = new Token(
    137, // chainID
    '0x6f7C932e7684666C9fd1d44527765433e01fF61d', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270,
    18, // decimals,
  );

  const WETH = new Token(
    137, // chainID
    '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
    18, // decimals
  );

  const WBTC = new Token(
    137, // chainID
    '0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270,
    18, // decimals,
  );

  const SUSHI = new Token(
    137, // chainID
    '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270,
    18, // decimals,
  );

  const IDLE = new Token(
    137, // chainID
    '0xc25351811983818c9fe6d8c580531819c8ade90f', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270,
    18, // decimals,
  );

  if (Supertoken === MATICxAddress) {
    return MATIC;
  }
  if (Supertoken === USDCxAddress) {
    return USDC;
  }
  if (Supertoken === DAIxAddress) {
    return DAI;
  } 
  if (Supertoken === MKRxAddress) {
    return MKR;
  }
  if (Supertoken === WETHxAddress) {
    return WETH;
  }
  if (Supertoken === WBTCxAddress) {
    return WBTC;
  }
  if (Supertoken === SUSHIxAddress) {
    return SUSHI;
  }
  if (Supertoken === IDLExAddress) {
    return IDLE;
  }
  console.log('error');
};
