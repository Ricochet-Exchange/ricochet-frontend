import React, { useState, useEffect } from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { truncateAddr } from 'utils/helpers';
import { Framework } from '@superfluid-finance/sdk-core';
import { selectMain } from 'store/main/selectors';
import deleteFlow from 'utils/superfluidStreams/deleteFlow';
import { calculateFlowRate } from 'utils/calculateFlowRate';
import { blockInvalidChar } from 'utils/blockInvalidChars';
import updateExistingFlow from 'utils/superfluidStreams/updateExistingFlow';
import { TokenIcon } from 'components/common/TokenIcon';
import * as Sentry from '@sentry/react';
import styles from './styles.module.scss';

interface IProps {}

export const StreamManager: React.FC<IProps> = () => {
  const { web3, address: account } = useShallowSelector(selectMain);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamList, setStreams] = useState([]);
  const [updateOperation, toggleUpdate] = useState(false);
  const [updatedFlowRate, updateFlowRate] = useState('');
  
  useEffect(() => {
    let mounted = true;
    if (web3.currentProvider && account) {
      (async () => {
        setIsLoading(true);
        try {
          const web3ModalSf = await Framework.create({
            chainId: Number(process.env.REACT_APP_CHAIN_ID),
            provider: web3,
          });
      
          const { data: sentStream } = await web3ModalSf.query.listStreams({ sender: account });
          const streams = [...sentStream];
          
          if (mounted) {
            // @ts-expect-error
            const filteredStreams = [];
            streams.forEach((stream) => {
              if (+(stream.currentFlowRate) > 0) {
                filteredStreams.push(stream);
              }
            });
            // @ts-expect-error
            setStreams(filteredStreams);
          }
        } catch (e) {
          console.error('Recent Activity Error: ', e);
          Sentry.captureException(e);
        }
        setIsLoading(!isLoading);
      })();
    }
    return () => {
      mounted = false;
    };
  }, [web3, account]);

  return (
    <div className={styles.container}>
      <div className="">
        <h2 className={styles.outGoing}>{`${streamList.length} Outgoing Streams.`}</h2>
      </div>
        
      {
        streamList.map(({
          createdAtTimestamp,
          sender,
          receiver,
          currentFlowRate,
          token,
        }, i) => {
          // @ts-expect-error
          const TokenName = token.name;
          // @ts-expect-error
          const TokenID = token.id;
          console.log(createdAtTimestamp, sender, i, token);
          return (
            <div className={styles.streamRow}>
              
              <div className="">
                <img src="" alt="" className="" />
                <h3 className={styles.receiver}>
                  <strong>To: </strong>
                  {truncateAddr(receiver)}
                </h3>
              </div>
      
              <div className={styles.info}>
                <TokenIcon tokenName={TokenName} />
                
                <h3 className={styles.currentFlow}>
                  {currentFlowRate} 
                  {' '}
                  <strong>Per second</strong>
                  {' '}
                </h3>

                <div className={styles.update_buttons}>
                  <button 
                    className={styles.change_flow_update} 
                    onClick={() => { toggleUpdate(true); }}
                  >
                    Update Flow
                  </button>
                  <button 
                    className={styles.change_flow_cancel} 
                    onClick={() => { deleteFlow(sender, receiver, TokenID); }}
                  >
                    Delete Flow
                  </button>
                </div>
              </div>

              {
                updateOperation ? (
                  <div className={styles.updatePrompt}>
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
                      <span>Per month</span>
                    </div>

                    <button 
                      className={styles.amount_change}
                      disabled={updatedFlowRate === ''}
                      onClick={() => { updateExistingFlow(receiver, updatedFlowRate, TokenID); }}
                    >
                      Confirm
                    </button>
                  </div>
                )
                  :
                  ''
              }
            </div>
          );
        })
        }
    </div>
  );
};

export default StreamManager;
