import React from 'react';
import { InvestNav } from 'components/layout/InvestNav';
import styles from './styles.module.scss';
import { Coin, namesCoin, iconsCoin, namesCoinX} from 'constants/coins'
import { shallowCopy } from 'ethers/lib/utils';

interface IProps {}

const TokenModal = (props: any) => {
  const [tokenList, setTokenList] = React.useState<any>();
  
  React.useEffect(() => {
    const result = Object.entries(Coin);
    setTokenList(result);
  }, []);

  return (
    <>
      {
      props.display ?
        <div className={styles.modal}>
          
          <div className={styles.modal_container}>
            <div className={styles.row}>
              <div>
                Select Token:
              </div>
              <div>
                <button onClick={props.onClick}>
                  X
                </button>
              </div>
            </div>
            <div>
              <div 
                className={styles.token_selection}>
                <img src={iconsCoin.RIC} />
                <span>RIC</span>
              </div>
              <div
                className={styles.token_selection}>
                <img src={iconsCoin.DAI} />
                <span>DAIx</span>
              </div>
              <div 
                className={styles.token_selection}>
                <img src={iconsCoin.MKR} />
                <span>MKRx</span>
              </div>
              <div
                className={styles.token_selection}>
                <img src={iconsCoin.USDC} />
                <span>USDCx</span>
              </div>
              <div 
                className={styles.token_selection}>
                <img src={iconsCoin.BTC} />
                <span>WBTCx</span>
              </div>
              <div
                className={styles.token_selection}>
                <img src={iconsCoin.ETH} />
                <span>WETHx</span>
              </div>
              <div
                className={styles.token_selection}>
                <img src={iconsCoin.MATIC} />
                <span>MATICx</span>
              </div>
              <div
                className={styles.token_selection}>
                <img src={iconsCoin.SUSHI} />
                <span>SUSHIx</span>
              </div>
              <div
                className={styles.token_selection}>
                <img src={iconsCoin.IDLE} />
                <span>IDLEx</span>
              </div>
            </div>
          </div>
        </div>
        :
        null  
      }
    </>
  )
};

const WarningModal = (props: any) => {
  return (
    <>
      {
      props.display ?
        <div className={styles.modal}>
          <div className={styles.modal_container}>
          </div>
        </div>
        :
        null  
      }
    </>
  )
};

const SettingsModal = (props: any) => {
  return (
    <>
      {
      props.display ?
        <div className={styles.modal}>
          <div className={styles.modal_container}>
          </div>
        </div>
        :
        null  
      }
    </>
  )
};

export const TradeContainer :React.FC<IProps> = () => {
  const [superTokenFrom] = React.useState();
  const [superTokenTo] = React.useState();
  const [amountIn, setAmountIn] = React.useState();
  const [amountOut, setAmountOut] = React.useState();
  const [address] = React.useState();
  const [pool] = React.useState();
  const [showTokenModal, setTokenModal] = React.useState(false);
  const [showWaringModal] = React.useState(false);
  const [tokenA, setTokenA] = React.useState({symbol: "",token: "select token"});
  const [tokenB, setTokenB] = React.useState({symbol: "",token: "select token"});
  const [input, setInput] = React.useState('');

  const closeTokenModal = () => {
    setTokenModal(false);
  };

  const openTokenModal = () => {
    setTokenModal(true);
  };

  const updateAmountIn = (e:any) => {
    const validNumber = new RegExp(/^\d*\.?\d*$/);
    if (validNumber.test(e.target.value)) {
      setAmountIn(e.target.value);
    }
  };

  const updateAmountOut = (e:any) => {
    const validNumber = new RegExp(/^\d*\.?\d*$/);
    if (validNumber.test(e.target.value)) {
      setAmountOut(e.target.value);
    }
  };

  const Swap = () => {
  }

  const setCoinA = (token: string, symbol:string) => {
    setTokenA({token: "", symbol: ""});
  }

  return (
    <>
      <TokenModal onClick={() => closeTokenModal()} display={showTokenModal}/>
      {/*<WarningModal display={showWaringModal}/>*/}
      <div className={styles.outer_container}>
        <InvestNav />
        <div className={styles.container}>
          <div className={styles.trade_box}>
            <div className={styles.row}>
              <button>Setting</button>
            </div>
            <div className={styles.trade_input}>
              <div>
                <input value={amountOut} placeholder='0.0' onInput={(e) => updateAmountOut(e)}/>
              </div>
              <div>
                <button onClick={() => openTokenModal()} className={styles.swap_option}>
                  <div>{tokenA.symbol}</div>
                  <div>{tokenA.token}</div>
                </button>
                <div>balance: 0</div>
              </div>
            </div>
            <div className={styles.trade_input}>
              <div>
                <input value={amountIn} placeholder='0.0' onInput={(e) =>  updateAmountIn(e)}/>
              </div>
              <div>
                <button onClick={() => openTokenModal()} className={styles.swap_option}>
                  <div>{tokenB.symbol}</div>
                  <div>{tokenB.token}</div>
                </button>
                <div>balance: 0</div>
              </div>
            </div>
            <div 
              className={styles.trade_button} 
              onClick={() => Swap()}>
              <button>Swap</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
