import React from 'react';
import { InvestNav } from 'components/layout/InvestNav';
import styles from './styles.module.scss';
import { Coin, namesCoin, iconsCoin, namesCoinX} from 'constants/coins'

interface IProps {}

const TokenModal = (props: any) => {
  console.log(iconsCoin)
  return (
    <>
      {
      props.display ?
        <div className={styles.modal}>
          <div className={styles.modal_container}>
            {
              namesCoinX.map((token) => {
                <div>
                  {token}
                </div>
              })
            }
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
  const [showTokenModal] = React.useState(true);
  const [showWaringModal] = React.useState(false);
  const [tokenA, setTokenA] = React.useState({symbol: "none",token: "select token"});
  const [tokenB, setTokenB] = React.useState({symbol: "none",token: "select token"});

  return (
    <>
      <TokenModal display={showTokenModal}/>
      <WarningModal display={showWaringModal}/>
      <div className={styles.outer_container}>
        <InvestNav />
        <div className={styles.container}>
          <div className={styles.trade_box}>
          <div className={styles.row}>
            <button>Setting</button>
          </div>
            <div className={styles.trade_input}>
              <div>
                <input placeholder='0.0'/>
              </div>
              <div>
                <button className={styles.swap_option}>
                  <div>{tokenA.symbol}</div>
                  <div>{tokenA.token}</div>
                </button>
                <div>balance: 0</div>
              </div>
            </div>

            <div className={styles.trade_input}>
              <div>
                <input placeholder='0.0'/>
              </div>
              <div>
                <button className={styles.swap_option}>
                  <div>{tokenB.symbol}</div>
                  <div>{tokenB.token}</div>
                </button>
                <div>balance: 0</div>
              </div>
            </div>
            <div className={styles.trade_button}>
              <button>Swap</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
