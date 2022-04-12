import React, { FC, useState } from 'react';
import deleteFlow from 'utils/superfluidStreams/deleteFlow';
import updateExistingFlow from 'utils/superfluidStreams/updateExistingFlow';
import { truncateAddr } from 'utils/helpers';
import { TokenIcon } from 'components/common/TokenIcon';
import { blockInvalidChar } from 'utils/blockInvalidChars';
import { calculateFlowRate } from 'utils/calculateFlowRate';
import styles from './styles.module.scss';

interface IProps {
  receiver: string,
  TokenName: string | undefined, 
  currentFlowRate: string,
  sender: string,
  TokenID: string,
  timestamp: number,
  TokenSymbol: string,
}

export const StreamManagerItem: FC<IProps> = ({
  receiver,
  TokenName,
  currentFlowRate,
  TokenSymbol,
  sender,
  TokenID, 
  timestamp,
}) => {
  const SECONDS_PER_MONTH = 30 / 24 / 60 / 60;
  const date = new Date(timestamp * 1000).toString();
  const [updatedFlowRate, updateFlowRate] = useState('');
  const [updateOperation, update] = useState(false);

  return (
    <div className={styles.streamRow}>
      <div className="stream">
        <h3 className={styles.receiver}>
          <strong>To: </strong>
          {truncateAddr(receiver)}
          <br />
      
        </h3>
            
        {TokenName ? (
          <>
            {/* @ts-expect-error */}
            <TokenIcon tokenName={TokenSymbol} />
            <br />
            <h3 className={styles.currentFlow}>
              {`started on ${date}`}
            </h3>
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
          <div className={styles.update_buttons}>
            <button 
              className={styles.change_flow_cancel} 
              onClick={() => { deleteFlow(sender, receiver, TokenID); }}
            >
              Delete Flow
            </button>
            <button 
              onClick={() => { update(!updateOperation); }}
              className={styles.toggleBtn}
            >
              Update
            </button>
          </div>

          {
              updateOperation ? (
                <div className={styles.updatePrompt}>
                  {truncateAddr(receiver)}
                  <div className={styles.amount_container}>
                    <h3 className={styles.amount_label}>What is the new payment amount?</h3>
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
                          await updateFlowRate(newFlow.toString());
                          console.log(newFlow.toString);
                        }
                      }}
                    />
                    <br />
                    <span>Per month</span>
                  </div>

                  <button 
                    className={styles.amount_change}
                    disabled={updatedFlowRate === ''}
                    onClick={() => { updateExistingFlow(receiver, updatedFlowRate, TokenID); }}
                  >
                    Confirm
                  </button>

                  <button 
                    className={styles.change_flow_cancel}
                    onClick={() => { update(false); }}
                  >
                    Cancel
                  </button>
                </div>
              )
                :
                ''
            }
        </div>
      </div>
      
    </div>
  );
};
