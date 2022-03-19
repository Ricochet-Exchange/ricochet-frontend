import { Button } from 'components/common/Button';
import React from 'react';
import { InvestNav } from 'components/layout/InvestNav';
import { getContract } from 'utils/getContract';
import { tradeABI } from 'constants/abis';
import { rexSuperSwapAddress, RICAddress } from 'constants/polygon_config';
import { selectMain } from 'store/main/selectors';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { Protocol } from '@uniswap/router-sdk';
import { AlphaRouter } from '@uniswap/smart-order-router';
import {
  CurrencyAmount, Percent, Token, TradeType, 
} from '@uniswap/sdk-core';
import { JSBI } from '@uniswap/sdk';
import { ethers } from 'ethers';
import { useTranslation } from 'react-i18next';

import { UserSettings } from 'components/layout/UserSettings';
import styles from './styles.module.scss';
import { SwapContainer } from '../SwapContainer';

export const TradeContainer = () => {
  const state = useShallowSelector(selectMain);
  const {
    address, balances,
  } = state;
  const { t } = useTranslation();
  
  const { web3 } = useShallowSelector(selectMain);
  const contract = getContract(rexSuperSwapAddress, tradeABI, web3);
  const MATICx = '0x3aD736904E9e65189c3000c7DD2c8AC8bB7cD4e3';
  const USDCx = '0xCAa7349CEA390F89641fe306D93591f87595dc1F';
  // const provider = new ethers.providers.Web3Provider((web3.currentProvider as any));
  const jsonRpcEndoint = "https://eth-rinkeby.alchemyapi.io/v2/EympKbVd25P3Rzq3LF1Pa3-OteT_0lVn";
  const provider = new ethers.providers.JsonRpcProvider(jsonRpcEndoint, 137);
  const router = new AlphaRouter({ chainId: 137, provider: (provider as any) });
  
  const MATIC = new Token(
    137, // chainID
    '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270', // 0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270
    18, // decimals
    'WMATIC',
    'Wrapped//Matic',
  );

  const USDC = new Token(
    137,
    '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    6,
    'USDC',
    'USD//C',
  );

  console.log('MATIC', MATIC);
  console.log('USDC', USDC);

  const typedValueParsed = '100';
  const amount = CurrencyAmount.fromRawAmount(MATIC, JSBI.BigInt(typedValueParsed));

  async function handleSwap() {
    const route = await router.route(
      amount,
      USDC,
      TradeType.EXACT_INPUT,
      {
        recipient: address,
        slippageTolerance: new Percent(5, 100),
        deadline: Date.now() + 1800,
      },
      { minSplits: 1, protocols: [Protocol.V3] },
    );

    console.log(route);
    if (route) {
      console.log(`Quote Exact In: ${route.quote.toFixed(2)}`);
      console.log(`Gas Adjusted Quote In: ${route.quoteGasAdjusted.toFixed(2)}`);
      console.log(`Gas Used USD: ${route.estimatedGasUsedUSD.toFixed(6)}`);
      console.log(contract.methods.swap, route?.methodParameters);
      const response = contract.methods
        .swap(
          USDCx,
          MATICx,
          '100',
          '0',
          ['0x2791bca1f2de4661ed88a30c99a7a9449aa84174', '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619'],
          ['500'],
        )
        .send({
          from: address,
        });
      console.log(response);
    }
  }

  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.settings_mob}>
        <UserSettings
          className={styles.dot}
          ricBalance={balances && balances[RICAddress]}
          account={address || t('Connect Wallet')}
        />
      </div>
      <SwapContainer 
        address={address}
        balance={balances && balances[RICAddress]} 
      />
    </div>
  );
};
