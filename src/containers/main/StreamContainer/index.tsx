import React, { useState } from 'react';
import {
  DAIxAddress,
  USDCxAddress,
  WETHxAddress,
  MKRxAddress,
  WBTCxAddress,
  MATICxAddress,
  SUSHIxAddress,
  IDLExAddress,
  RICAddress,
} from 'constants/polygon_config';
import { blockInvalidChar } from 'utils/blockInvalidChars';
import { NavLink } from 'react-router-dom';
import { calculateFlowRate } from 'utils/calculateFlowRate';
import { Framework } from '@superfluid-finance/sdk-core';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { ethers } from 'ethers';
import styles from './styles.module.scss';

interface IProps {}

export const StreamContainer: React.FC<IProps> = () => {
  const [recipient, setRecipient] = useState('0x1d9f081BdA444671A1212cE5Be88eD06bdf6b9e9');
  const [superToken, setSuperToken] = useState(`${RICAddress}`);
  const [flowRate, setFlowRate] = useState('1000000000000');
  const [PanelOpen, TogglePanel] = useState(false);
  const [transactionReview, ToggleTransaction] = useState(false);

  async function createNewFlow() {
    if (window.ethereum) {
      // @ts-expect-error
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const chainId = Number(await window.ethereum.request({ method: 'eth_chainId' }));
  
      const sf = await Framework.create({
        chainId: Number(chainId),
        provider,
      });

      const signer = provider.getSigner();

      try {
        const createFlowOperation = sf.cfaV1.createFlow({
          flowRate,
          receiver: recipient,
          superToken,
        });
        await createFlowOperation.exec(signer);

        ToggleTransaction(true);
      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <div className="">
      <div className={styles.stream_button_container}>

        <button className={styles.stream_button} onClick={() => { TogglePanel(!PanelOpen); }}>
          Send
        </button>  
 
      </div>

      {PanelOpen ? (
        <div className={styles.stream_panel_container}>
          <div className={styles.stream_form_container}>
            <div>
              {transactionReview ? 
                <h2 className={styles.title}>Stream Open</h2>
                : 
                <h2 className={styles.title}>Send Money</h2>}
            </div>

            <button className={styles.exit_btn} onClick={() => { TogglePanel(false); }}>
              <FontIcon name={FontIconName.Close} className={styles.close} size={24} />
            </button>
      
            {
              transactionReview ? (
                <>
                  <h3 className={styles.result}>
                    Your stream has been created, you can see your stream in the Activity Page.
                  </h3>
                  <NavLink to="/recent-activity" />
                </>
              )
                : (
                  <div className={styles.stream_form}>
                    <div className={styles.input_container}>
                      <label htmlFor="recipient" className={styles.input_label}>Wallet Address here</label>
                      <input className={styles.input_field} type="text" id="recipient" placeholder="Receiver Address" onChange={async (e) => { await setRecipient(e.target.value); }} />
                    </div>
          
                    <div>
                      <label className={styles.input_label} htmlFor="payment">Payment amount per month</label>
                      <input
                        id="payment"
                        className={styles.input_field} 
                        type="number" 
                        placeholder="Payment Amount Per month in" 
                        onKeyDown={blockInvalidChar}
                        min={0}
                        onChange={async (e) => { 
                          const newFlow = await calculateFlowRate(+(e.target.value));
                          if (newFlow) {
                            await setFlowRate(newFlow.toString()); 
                          }
                        }}
                      />
                  
                    </div>
          
                    <div>
                      <label className={styles.input_label} htmlFor="supertoken">Supertoken</label>
                      <select
                        name="SuperTokens" 
                        id="supertoken"
                        defaultValue={`${RICAddress}`} 
                        onChange={async (e) => { await setSuperToken(e.target.value); }} 
                        className={styles.input_field}
                      >
                        <option value={`${RICAddress}`} selected>RIC</option>
                        <option value={`${DAIxAddress}`}>DAIx</option>
                        <option value={`${USDCxAddress}`}>USDCx</option>
                        <option value={`${WBTCxAddress}`}>WBTC</option>
                        <option value={`${WETHxAddress}`}>WETHx</option>
                        <option value={`${MATICxAddress}`}>MATICx</option>
                        <option value={`${SUSHIxAddress}`}>SUSHIx</option>
                        <option value={`${IDLExAddress}`}>IDLEx</option>
                        <option value={`${MKRxAddress}`}>MKRx</option>
                      </select>
                    </div>
          
                    <button 
                      className={styles.input_field_submit} 
                      onClick={() => { createNewFlow(); }}
                    >
                      Create Stream
                    </button>
                  </div>
                )
              }
            <div className="description" />
          </div>
        </div>
      )
        :
        ''}
    </div>
  );
};
