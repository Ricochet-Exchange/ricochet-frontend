/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowDownOutlined } from '@ant-design/icons';
import { InchModal } from 'components/swap/InchModal';
import {
  DAIxAddress,
  USDCxAddress,
  WETHxAddress,
  MKRxAddress,
  WBTCxAddress,
  MATICxAddress,
  SUSHIxAddress,
  IDLExAddress,
  swapContractAddress,
} from 'constants/polygon_config';
import ReactModal from 'react-modal';
import { Button, Card } from 'antd';
import { getContract } from 'utils/getContract';
import { erc20ABI, tradeABI } from 'constants/abis';
import { selectMain } from 'store/main/selectors';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { Protocol } from '@uniswap/router-sdk';
import { AlphaRouter } from '@uniswap/smart-order-router';
import {
  CurrencyAmount, Percent, Token, TradeType, 
} from '@uniswap/sdk-core';
import { JSBI } from '@uniswap/sdk';
import { ethers } from 'ethers';
import {
  getUnderlyingSupertoken,
  getUnderlyingToken,
} from 'utils/getUnderlyingToken';
import { InvestNav } from 'components/layout/InvestNav';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import customStyles from './styles.module.scss';

const supportedCurrencies = [
  {
    currency: 'DAIx',
    address: DAIxAddress,
  },

  {
    currency: 'USDCx',
    address: USDCxAddress,
  },

  {
    currency: 'WETHx',
    address: WETHxAddress,
  },

  {
    currency: 'MKRx',
    address: MKRxAddress,
  },

  {
    currency: 'WBTCx',
    address: WBTCxAddress,
  },

  {
    currency: 'MATICx',
    address: MATICxAddress,
  },

  {
    currency: 'SUSHIx',
    address: SUSHIxAddress,
  },

  {
    currency: 'IDLEx',
    address: IDLExAddress,
  },
];

interface IProps {}

const styles = {
  card: {
    width: '430px',
    boxShadow: '0 0.5rem 1.2rem rgb(189 197 209 / 20%)',
    border: '1px solid #e7eaf3',
    borderRadius: '1rem',
    fontSize: '16px',
    fontWeight: '500',
  },
  input: {
    padding: '0',
    fontWeight: '500',
    fontSize: '23px',
    display: 'block',
    width: '55%',
  },
  priceSwap: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '15px',
    color: '#434343',
    marginTop: '8px',
    padding: '0 10px',
  },
};

interface FromTokenProps {
  logoURI: string;
  symbol: any;
}

interface ToTokenProps {
  logoURI: string;
  symbol: any;
}

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const SwapContainer: React.FC<IProps> = () => {
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [fromTokenAddress, setFromTokenAddress] = useState('');
  const [toTokenAddress, setToTokenAddress] = useState('');
  const [quote, setQuote] = useState();
  const [fromAmount, setFromAmount] = useState('0');
  const [toAmount, setToAmount] = useState('0');
  const [isToModalActive, setToModalActive] = useState(false);
  const [isTokenApproved, setIsTokenApproved] = useState('');
  const [router, setRouter] = useState<AlphaRouter>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [isLoading, setIsLoading] = useState(true);
  const [swapConfig, setSwapConfig] = useState<{
    fromTokenAddress: string;
    toTokenAddress: string;
    multi: number;
    key:
    | 'hasDaixApprove'
    | 'hasUsdcxApprove'
    | 'hasWethxApprove'
    | 'hasMkrxApprove'
    | 'hasWbtcxApprove'
    | 'hasMaticxApprove'
    | 'hasSushixApprove'
    | 'hasIdlexApprove';
  }>();
  const dispatch = useDispatch();
  const state = useShallowSelector(selectMain);

  const { address, balances } = state;
  const { web3 } = useShallowSelector(selectMain);

  const swapContract = getContract(swapContractAddress, tradeABI, web3);

  useEffect(() => {
    if (web3.currentProvider) {
      const tempProvider = new ethers.providers.Web3Provider(
        web3.currentProvider as any,
      );
      setProvider(tempProvider);
      const tempRouter = new AlphaRouter({
        chainId: 137,
        provider: provider as any,
      });
      setRouter(tempRouter);
      setIsLoading(false);
    }
    setIsLoading(true);
  }, [web3.currentProvider]);

  const handleApprove = async () => {
    const tokenContract = getContract(fromTokenAddress, erc20ABI, web3);
    await tokenContract.methods.approve(fromTokenAddress, fromAmount).send({
      from: address,
    });
  };

  const checkIfApproved = async (fromSupertoken: Token) => {
    console.log(fromSupertoken);
    const tokenContract = getContract(fromSupertoken.address, erc20ABI, web3);
    const allowance = await tokenContract.methods
      .allowance(address, swapContractAddress)
      .call();
    console.log('allowance: ', allowance);
    return allowance.toString() >=
      fromAmount + '0'.repeat(fromSupertoken.decimals);
  };

  async function handleSwap() {
    const fromToken = await getUnderlyingToken(fromTokenAddress);
    const toToken = await getUnderlyingToken(toTokenAddress);
    const tempSupertoken = await getUnderlyingSupertoken(fromTokenAddress);
    const isApproved = await checkIfApproved(tempSupertoken);
    if (isApproved === false) {
      console.log('First approve token');
      return;
    }

    console.log('fromToken: ', fromToken);
    console.log('toToken: ', toToken);

    const currencyAmount = CurrencyAmount.fromRawAmount(
      /* @ts-ignore */
      fromToken,
      JSBI.BigInt(fromAmount),
    );
    console.log('amount: ', currencyAmount);

    // @ts-ignore
    const route = await router.route(
      currencyAmount,
      // @ts-ignore
      toToken,
      TradeType.EXACT_INPUT,
      {
        recipient: address,
        slippageTolerance: new Percent(5, 100),
        deadline: 10000,
      },
      { minSplits: 0, protocols: [Protocol.V3, Protocol.V2] },
    );

    console.log('route: ', route);
    // @ts-ignore
    const path = route?.route[0].route.tokenPath.map((token) => token.address);
    console.log('path: ', path);
    // @ts-ignore
    const fees = route?.route[0].route.pools.map((pool) => pool.fee);
    console.log('fees: ', fees);
    if (route && fromToken !== undefined && toToken !== undefined) {
      console.log(`Quote Exact In: ${route.quote.toFixed(2)}`);
      console.log(
        `Gas Adjusted Quote In: ${route.quoteGasAdjusted.toFixed(2)}`,
      );
      console.log(`Gas Used USD: ${route.estimatedGasUsedUSD.toFixed(6)}`);
      console.log(swapContract.methods.swap, route?.methodParameters);
      const response = swapContract.methods
        .swap(
          fromToken.address,
          toToken.address,
          fromAmount + '0'.repeat(fromToken.decimals),
          0,
          path,
          fees,
        )
        .send({
          from: address,
          maxPriorityFeePerGas: 30 * 10 ** 9,
        });
      console.log(response);
    } else {
      console.log(fromToken, toToken);
    }
  }
  const handleFromAmountChange = (event: any) => {
    setFromAmount(event.target.value);
  };

  const handleToAmountChange = (event: any) => {
    setToAmount(event.target.value);
  };

  return (
    <>
      {provider && (
        <div className={customStyles.wrapper}>
          <InvestNav />
          <LoadingWrapper isLoading={isLoading} loadingType="spinner">
            <Card style={styles.card} bodyStyle={{ padding: '18px' }}>
              <Card
                style={{ borderRadius: '1rem' }}
                bodyStyle={{ padding: '0.8rem' }}
              >
                <div
                  style={{
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#434343',
                  }}
                >
                  From
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <input
                      type="number"
                      placeholder="0.00"
                      style={{ ...styles.input }}
                      onChange={handleFromAmountChange}
                      value={fromAmount}
                    />
                    <p style={{ fontWeight: '600', color: '#434343' }}>
                      {/* {fromTokenAmountUsd} */}
                    </p>
                  </div>
                  <Button
                    style={{
                      height: 'fit-content',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderRadius: '0.6rem',
                      padding: '5px 10px',
                      fontWeight: '500',
                      fontSize: '17px',
                      gap: '7px',
                      border: 'none',
                    }}
                    onClick={() => setFromModalActive(true)}
                  >
                    {fromTokenAddress ? (
                      <div>{fromTokenAddress}</div>
                    ) : (
                      <span>Select a token</span>
                    )}
                    {/* <span>{fromTokenAddress?.symbol}</span> */}
                    <Arrow />
                  </Button>
                </div>
              </Card>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '10px',
                }}
              >
                <ArrowDownOutlined />
              </div>
              <Card
                style={{ borderRadius: '1rem' }}
                bodyStyle={{ padding: '0.8rem' }}
              >
                <div
                  style={{
                    marginBottom: '5px',
                    fontSize: '14px',
                    color: '#434343',
                  }}
                >
                  To
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex' }}>
                    <input
                      placeholder="0.00"
                      style={styles.input}
                      onChange={handleToAmountChange}
                      value={toAmount}
                    />
                    <p style={{ fontWeight: '600', color: '#434343' }}>
                      {/* {toTokenAmountUsd} */}
                    </p>
                  </div>
                  <Button
                    style={{
                      height: 'fit-content',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderRadius: '0.6rem',
                      padding: '5px 10px',
                      fontWeight: '500',
                      fontSize: '17px',
                      gap: '7px',
                      border: 'none',
                    }}
                    onClick={() => setToModalActive(true)}
                    type={toTokenAddress ? 'default' : 'primary'}
                  >
                    {toTokenAddress ? (
                      <div>{toTokenAddress}</div>
                    ) : (
                      <span>Select a token</span>
                    )}
                    {/* <span>{toTokenAddress?.symbol}</span> */}
                    <Arrow />
                  </Button>
                </div>
              </Card>
              {quote && (
                <div>
                  <p
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '15px',
                      color: '#434343',
                      marginTop: '8px',
                      padding: '0 10px',
                    }}
                  >
                    {/* Estimated Gas: <p></p> */}
                  </p>
                  {/* <PriceSwap /> */}
                </div>
              )}
              <Button
                type="primary"
                size="large"
                style={{
                  width: '100%',
                  marginTop: '15px',
                  borderRadius: '0.6rem',
                  height: '50px',
                }}
                // disabled={(swapConfig && state[swapConfig?.key])}
                onClick={() => handleApprove()}
                // disabled={!ButtonState.isActive}
              >
                {/* {ButtonState.p} */}
                Approve
              </Button>
              <Button
                type="primary"
                size="large"
                style={{
                  width: '100%',
                  marginTop: '15px',
                  borderRadius: '0.6rem',
                  height: '50px',
                }}
                // disabled={(swapConfig && state[swapConfig?.key])}
                onClick={() => handleSwap()}
                // disabled={!ButtonState.isActive}
              >
                {/* {ButtonState.p} */}
                Swap
              </Button>
            </Card>
            <ReactModal
              isOpen={isFromModalActive}
              className={customStyles.modal}
              overlayClassName={customStyles.modal_overlay}
              preventScroll
            >
              <InchModal
                open={isFromModalActive}
                onClose={() => setFromModalActive(false)}
                setToken={setFromTokenAddress}
                tokenList={supportedCurrencies}
                direction="in"
              />
            </ReactModal>
            <ReactModal
              isOpen={isToModalActive}
              className={customStyles.modal}
              overlayClassName={customStyles.modal_overlay}
              preventScroll
            >
              <InchModal
                open={isToModalActive}
                onClose={() => setToModalActive(false)}
                setToken={setToTokenAddress}
                tokenList={supportedCurrencies}
                direction="out"
              />
            </ReactModal>
          </LoadingWrapper>
        </div>
      )}
    </>
  );
};
