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

import { Framework } from '@superfluid-finance/sdk-core';
import { ethers } from 'ethers';
import styles from './styles.module.scss';

interface IProps {

}

export const StreamContainer: React.FC<IProps> = () => {
  const [recipient, setRecipient] = useState('0x1d9f081BdA444671A1212cE5Be88eD06bdf6b9e9');
  const [superToken, setSuperToken] = useState(`${RICAddress}`);
  const [flowRate, setFlowRate] = useState('1000000000000');
  const [PanelOpen, TogglePanel] = useState(false);

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
        <button className={styles.stream_button}>Receive</button>
      </div>

      {PanelOpen ? (
        <div className={styles.stream_panel_container}>
          <div className={styles.stream_form_container}>
            <div>
              <h2 className={styles.title}>Send Money</h2>
            </div>
      
            <div className={styles.input_container}>
              <input className={styles.input_field} type="text" placeholder="Receiver Address" onChange={async (e) => { await setRecipient(e.target.value); }} />
            </div>
      
            <div>
              <input className={styles.input_field} type="number" placeholder="Payment Amount" onChange={async (e) => { await setFlowRate(e.target.value); }} />
            </div>
      
            <div>
              <select name="SuperTokens" onChange={async (e) => { await setSuperToken(e.target.value); }} className={styles.input_field}>
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
      
            <div>
              <button onClick={() => { createNewFlow(); }} className={styles.input_field}>
                Create Flow
              </button>
            </div>
      
            <div className="description" />
          </div>
        </div>
      
      )
        :
        ''}
    </div>
  );
};
