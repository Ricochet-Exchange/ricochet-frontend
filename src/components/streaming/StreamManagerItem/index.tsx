import React, { FC } from 'react';
import deleteFlow from 'utils/superfluidStreams/deleteFlow';
import { truncateAddr } from 'utils/helpers';
import { TokenIcon } from 'components/common/TokenIcon';
import { CoinPlaceholder } from 'components/common/CoinPlaceholder';

import styles from './styles.module.scss';

interface IProps {
  receiver: string,
  TokenName: string | undefined, 
  currentFlowRate: string,
  sender: string,
  TokenID: string,
  timestamp: number,
}

export const StreamManagerItem: FC<IProps> = ({
  receiver,
  TokenName,
  currentFlowRate,
  sender,
  TokenID, 
  timestamp,
}) => {
  const SECONDS_PER_MONTH = 30 / 24 / 60 / 60;

  const time = new Date(timestamp * 1000).toString().split(' ')[4];

  console.log(TokenID, TokenName, time);

  return (
    <div className={styles.streamRow}>
      <div className="stream">
        <img src="" alt="" className="" />
        <h3 className={styles.receiver}>
          <strong>To: </strong>
          {truncateAddr(receiver)}
        </h3>
        
        {TokenName ? (
          <>
            {/* @ts-expect-error */}
            <TokenIcon tokenName={TokenName} />
            <br />
            <CoinPlaceholder token={TokenID} /> 
          </>
        )
 
          : 
          ''}
      </div>
    
      <div className={styles.info}>
        
        <h3 className={styles.currentFlow}>
          {`of $${Math.trunc((+currentFlowRate / 1e8) * SECONDS_PER_MONTH)} per month, $${(+currentFlowRate / 1e18).toFixed(8)} per second`}
        </h3>

        <div className={styles.update_buttons}>
          <button 
            className={styles.change_flow_cancel} 
            onClick={() => { deleteFlow(sender, receiver, TokenID); }}
          >
            Delete Flow
          </button>
        </div>
      </div>
    </div>
  );
};
