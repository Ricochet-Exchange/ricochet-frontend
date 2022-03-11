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
import styles from './styles.module.scss';

interface IProps {

}

export const StreamContainer: React.FC<IProps> = () => {
  const [recipient, setRecipient] = useState('0x1d9f081BdA444671A1212cE5Be88eD06bdf6b9e9');
  const [superToken, setSuperToken] = useState(`${RICAddress}`);
  const [flowRate, setFlowRate] = useState('1000000000000');
  const [PanelOpen, TogglePanel] = useState(false);

  console.log(superToken, flowRate, recipient);

  return (
    <div className={styles.stream_panel_container}>
      <div className={styles.stream_button_container}>
        <button className={styles.stream_button} onClick={() => { TogglePanel(!PanelOpen); }}>
          Send
        </button>
        <button className={styles.stream_button}>Receive</button>
      </div>

      <div>
        {PanelOpen ? (
          <div className={styles.stream_form_container}>
            <div>
              <h2>Send Money</h2>
            </div>
   
            <div>
              <input type="text" placeholder="Receiver Address" onChange={async (e) => { await setRecipient(e.target.value); }} />
            </div>
   
            <div>
              <input type="number" placeholder="Payment Amount" onChange={async (e) => { await setFlowRate(e.target.value); }} />
            </div>

            <div>
              <select name="SuperTokens" onChange={async (e) => { await setSuperToken(e.target.value); }}>
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
              <button>
                Create Flow
              </button>
            </div>

            <div className="description" />
          </div>
        )
          :
          ''}
      </div>
    </div>
  );
};
