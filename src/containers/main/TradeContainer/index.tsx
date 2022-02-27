import React from 'react';
import { InvestNav } from 'components/layout/InvestNav';
import { iconsCoin } from 'constants/coins';
import { 
  RICAddress, 
  DAIxAddress, 
  MKRxAddress, 
  MATICxAddress, 
  WETHxAddress, 
  WBTCxAddress, 
  swapAddress, 
  SUSHIxAddress, 
  IDLExAddress, 
  USDCxAddress,
} from 'constants/polygon_config';
import { getContract } from 'utils/getContract';
import { swapABI } from 'constants/abis';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import axios from 'axios';
import styles from './styles.module.scss';

const tokenlist = [
  {
    token: 'RIC', symbol: iconsCoin.RIC, name: 'richochet', address: RICAddress,
  },
  {
    token: 'DAIx', symbol: iconsCoin.DAI, name: 'dai', address: DAIxAddress,
  },
  {
    token: 'MKRx', symbol: iconsCoin.MKR, name: 'maker', address: MKRxAddress,
  },
  {
    token: 'WBTCx', symbol: iconsCoin.BTC, name: 'bitcoin', address: WBTCxAddress,
  },
  {
    token: 'WETHx', symbol: iconsCoin.ETH, name: 'ethereum', address: WETHxAddress,
  },
  {
    token: 'MATICx', symbol: iconsCoin.MATIC, name: 'matic-network', address: MATICxAddress,
  },
  {
    token: 'Sushix', symbol: iconsCoin.SUSHI, name: 'sushi', address: SUSHIxAddress,
  },
  {
    token: 'IDLEx', symbol: iconsCoin.IDLE, name: 'idle', address: IDLExAddress,
  },
  {
    token: 'USDCx', symbol: iconsCoin.USDC, name: 'usd-coin', address: USDCxAddress,
  },
];

const TokenButton = (props: any) => {
  const { chooseToken, symbol, token } = props;
  return (
    <button 
      onClick={chooseToken}
      className={styles.token_selection}
    >
      <img className={styles.token_selection_image} src={symbol} alt="token bagde" />
      <span className={styles.token_selection_token}>{token}</span>
    </button>
  );
};

const TokenModal = (props: any) => { 
  const { display, closeTokenModal } = props;

  const Token = (image: string, symbol:any, name: string, tokenAddress: string) => { 
    const { chooseToken } = props;
    chooseToken(image, symbol, name, tokenAddress);
  };

  return (
    <div>
      { 
        display ?
          (
            <div className={styles.modal}>
              <div className={styles.modal_container}>
                <div className={styles.row}>
                  <div className={styles.modal_title}>
                    <h2>Select Token:</h2>
                  </div>
                  <div className={styles.modal_title}>
                    <button onClick={closeTokenModal}>
                      <h2>X</h2>
                    </button>
                  </div>
                </div>
                <div>
                  {
                    tokenlist.map((token) => 
                      (
                        <TokenButton 
                          key={token.name} 
                          token={token.token} 
                          symbol={token.symbol} 
                          tokenAddress={token.address} 
                          chooseToken={() => 
                            Token(
                              token.token, token.symbol, token.name, token.address,
                            )} 
                        />
                      ))
                  }
                </div>
              </div>
            </div>
          )
          :
          null
      }
    </div>
  );
};

export const TradeContainer :React.FC = () => { 
  const { address, balances, web3 } = useShallowSelector(selectMain);
  const contract = getContract(swapAddress, swapABI, web3);
  //  const [superTokenFrom] = React.useState();
  //  const [superTokenTo] = React.useState();
  const [isReady, setIsReady] = React.useState<boolean>(false);
  const [isTokenA, setIsTokenA] = React.useState<boolean>(false);
  const [tokenAInput, setTokenAInput] = React.useState<boolean>(true);
  const [tokenBInput] = React.useState<boolean>(true);
  const [amountOutEstimate, setAmountOutEstimate] = React.useState<any>(0);
  const [amountInEstimate, setAmountInEstimate] = React.useState<any>(0);
  // const [amountIn] = React.useState<number>();
  const [amountOut, setAmountOut] = React.useState<any>();
  //  const [address] = React.useState();
  //  const [pool] = React.useState();
  const [showTokenModal, setTokenModal] = React.useState<boolean>(false);
  //  const [showWaringModal] = React.useState(false);
  const [tokenA, setTokenA] = React.useState({ symbol: undefined, token: 'select token', name: '' });
  const [tokenABalance, setTokenABalance] = React.useState<number>(0);
  const [tokenARate, setTokenARate] = React.useState<number>(0);
  // const [tokenBBalance, setTokenBBalance] = React.useState<any>(0);
  const [tokenB, setTokenB] = React.useState({ symbol: undefined, token: 'select token', name: '' });
  const [allowSwap] = React.useState<boolean>(false);
  //  const [input, setInput] = React.useState('');
  //  const childRef = React.useRef();
  
  const closeTokenModal = () => {
    setTokenModal(false);
  };

  const getTokenPrice = async (token:string) => { 
    const coingeckoUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`;
    const coingeckoResp = await axios.get(coingeckoUrl);
    const { data } = coingeckoResp;
    const { usd } = data[`${token}`];
    return usd;
  };

  const openTokenModal = (choice: boolean) => {
    setTokenModal(true);
    setIsTokenA(choice);
  };

  const updateAmountIn = () => {
  };

  const Swap = () => { 
  };

  const setCoin = async (token: string, symbol:any, name: string, tokenAddress: string) => {
    if (isTokenA) {
      setTokenA({ token, symbol, name });
      setTokenAInput(false);
      closeTokenModal();
      if (balances) {
        setTokenABalance(parseFloat(balances[tokenAddress]));
        await getTokenPrice(name).then((results) => {
          setTokenARate(results);
        });
      } 
      closeTokenModal();
    } else {
      setTokenB({ token, symbol, name });
      closeTokenModal();
      if (balances) {
        // setTokenBBalance(parseFloat(balances[tokenAddress]));
        await getTokenPrice(name).then((results) => {
          setAmountInEstimate(amountOut / results);
        });
      }
    }
  };

  const lessThan = (amount?: number) => {
    if (amount) {
      if (amount >= 0) {
        return false;  
      }
    }
    return true;
  };

  /** @returns {any}  */
  const getAmountOutEstimate = () => {
    if (amountOut) {
      setAmountOutEstimate((amountOut * tokenARate).toFixed(2));
    }
  };

  const updateAmountOut = (e:any) => {
    // const validNumber = new RegExp(/^\d*\.?\d*$/);
    // if (validNumber.test(e.target.value) && e.target.value) {
    setAmountOut(parseFloat(e.target.value));
    console.log(amountOut);
    getAmountOutEstimate();
    // } else {
    //  setAmountOut(0);
    // }
  };

  const chooseToken = (token: string, symbol:string, name:string, tokenAddress: string) => {
    if (symbol) {
      setCoin(token, symbol, name, tokenAddress);
    }
  };

  React.useEffect(() => {
    if (contract && address && balances) {
      setIsReady(true);
    }
  }, [contract, address, balances]);

  React.useEffect(() => {
    getAmountOutEstimate();
  }, [amountOut]);

  return ( 
    <>
      <TokenModal 
        closeTokenModal={() => closeTokenModal()}
        chooseToken={(
          token: string, 
          symbol:string, 
          name: string, 
          tokenAddress: any,
        ) => chooseToken(token, symbol, name, tokenAddress)}
        display={showTokenModal} 
      />
      <div className={styles.outer_container}>
        <InvestNav />
        <div className={styles.container}>
          <div className={styles.trade_box}>
            <div className={styles.trade_input}>
              <div className={styles.token_row}>
                <input 
                  disabled={tokenAInput}
                  placeholder="0.0"
                  step="0.0000001"
                  min="0"
                  max="20"
                  onInput={(e) => updateAmountOut(e)}
                />
                {
                  lessThan(amountOut) ?
                    undefined
                    :
                    (
                      <div>
                        $
                        {
                          amountOutEstimate
                        }  
                      </div>
                    )
                }
              </div>
              <div className={styles.token_row}>
                <button 
                  disabled={!isReady} 
                  onClick={() => openTokenModal(true)} 
                  className={styles.swap_option}
                >
                  {
                    tokenA.symbol ?
                      (
                        <div className={styles.token_selection_image}>
                          <img src={tokenA.symbol} alt="token icon" width="25px" height="25px" />
                        </div>
                      )
                      :
                      null
                  }
                  <div>{tokenA.token}</div>
                </button>
                <div>
                  balance: 
                  {tokenABalance.toFixed(5)}
                </div>
              </div>
            </div>
            <div className={styles.trade_input}>
              <div>
                <input 
                  disabled={tokenBInput}
                  placeholder="0.0" 
                  value={amountInEstimate}
                  onInput={() => updateAmountIn()} 
                />
              </div>
              <div>
                <button 
                  disabled={!isReady} 
                  onClick={() => openTokenModal(false)} 
                  className={styles.swap_option}
                >
                  {
                    tokenB.symbol ?
                      (
                        <div>
                          <img 
                            className={styles.token_selection_image} 
                            width="25px" 
                            height="25px" 
                            src={tokenB.symbol} 
                            alt="token icon" 
                          />
                        </div>
                      )
                      :
                      null
                  }
                  <div>{tokenB.token}</div>
                </button>
              </div>
            </div>
            <div className={styles.trade_button}>
              <button 
                disabled={!allowSwap}
                onClick={() => Swap()}
              >
                Swap
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
