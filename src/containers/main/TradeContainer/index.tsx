import React from 'react';
import { InvestNav } from 'components/layout/InvestNav';
import { iconsCoin } from 'constants/coins';
import styles from './styles.module.scss';

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

  const Token = (image: string, name: any) => { 
    const { chooseToken } = props;
    chooseToken(image, name);
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
                  <TokenButton token="RIC" symbol={iconsCoin.RIC} chooseToken={() => Token('RIC', iconsCoin.RIC)} />
                  <TokenButton token="DAIx" symbol={iconsCoin.DAI} chooseToken={() => Token('DAIx', iconsCoin.DAI)} />
                  <TokenButton token="MKRx" symbol={iconsCoin.MKR} chooseToken={() => Token('MKRx', iconsCoin.MKR)} />
                  <TokenButton token="WBTCx" symbol={iconsCoin.WBTC} chooseToken={() => Token('WBTC', iconsCoin.BTC)} />
                  <TokenButton token="WETHx" symbol={iconsCoin.ETH} chooseToken={() => Token('WETHx', iconsCoin.ETH)} />
                  <TokenButton token="MATICx" symbol={iconsCoin.MATIC} chooseToken={() => Token('MATICx', iconsCoin.MATIC)} />
                  <TokenButton token="SUSHIx" symbol={iconsCoin.SUSHI} chooseToken={() => Token('SUSHIx', iconsCoin.SUSHI)} />
                  <TokenButton token="IDLEx" symbol={iconsCoin.IDLE} chooseToken={() => Token('IDLEx', iconsCoin.IDLE)} />
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
  //  const [superTokenFrom] = React.useState();
  //  const [superTokenTo] = React.useState();
  const [isTokenA, setIsTokenA] = React.useState(false);
  const [amountIn, setAmountIn] = React.useState();
  const [amountOut, setAmountOut] = React.useState();
  //  const [address] = React.useState();
  //  const [pool] = React.useState();
  const [showTokenModal, setTokenModal] = React.useState(false);
  //  const [showWaringModal] = React.useState(false);
  const [tokenA, setTokenA] = React.useState({ symbol: undefined, token: 'select token' });
  const [tokenB, setTokenB] = React.useState({ symbol: undefined, token: 'select token' });
  //  const [input, setInput] = React.useState('');
  //  const childRef = React.useRef();
  
  const closeTokenModal = () => {
    setTokenModal(false);
  };

  const openTokenModal = (choice: boolean) => {
    setTokenModal(true);
    setIsTokenA(choice);
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
  };

  const setCoin = (token: string, symbol?:any) => {
    if (isTokenA) {
      // if (tokenB.token !== token) { 
      setTokenA({ token, symbol });
      closeTokenModal();
      // }
    } else {
      // if (tokenA.token !== token) {
      setTokenB({ token, symbol });
      closeTokenModal();
      // }
    }
  };

  const chooseToken = (token: string, symbol?:string) => {
    if (symbol) {
      setCoin(token, symbol);
    }
  };

  return ( 
    <>
      <TokenModal 
        closeTokenModal={() => closeTokenModal()}
        chooseToken={(token: string, symbol:string) => chooseToken(token, symbol)}
        display={showTokenModal} 
      />
      <div className={styles.outer_container}>
        <InvestNav />
        <div className={styles.container}>
          <div className={styles.trade_box}>
            <div className={styles.trade_input}>
              <div>
                <input 
                  value={amountOut} 
                  placeholder="0.0"
                  onInput={(e) => updateAmountOut(e)}
                />
              </div>
              <div>
                <button onClick={() => openTokenModal(true)} className={styles.swap_option}>
                  {
                    tokenA.symbol ?
                      <div><img className={styles.token_selection_image} src={tokenA.symbol} alt="token icon" /></div>
                      :
                      null
                  }
                  <div>{tokenA.token}</div>
                </button>
                <div>balance: 0</div>
              </div>
            </div>
            <div className={styles.trade_input}>
              <div>
                <input value={amountIn} placeholder="0.0" onInput={(e) => updateAmountIn(e)} />
              </div>
              <div>
                <button onClick={() => openTokenModal(false)} className={styles.swap_option}>
                  {
                    tokenB.symbol ?
                      (
                        <div>
                          <img className={styles.token_selection_image} src={tokenB.symbol} alt="token icon" />
                        </div>
                      )
                      :
                      null
                  }
                  <div>{tokenB.token}</div>
                </button>
                <div>balance: 0</div>
              </div>
            </div>
            <div className={styles.trade_button}>
              <button onClick={() => Swap()}>Swap</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
