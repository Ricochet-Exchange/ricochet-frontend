import React, { useState, useEffect } from 'react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { Framework } from '@superfluid-finance/sdk-core';
import { selectMain } from 'store/main/selectors';
import * as Sentry from '@sentry/react';
import { StreamManagerItem } from '../StreamManagerItem';
import styles from './styles.module.scss';

interface IProps {}

export const StreamManager: React.FC<IProps> = () => {
  const { web3, address: account } = useShallowSelector(selectMain);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [streamList, setStreams] = useState([]);
  
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
                console.log(stream);
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
            <div>
              <StreamManagerItem 
                sender={sender} 
                receiver={receiver} 
                currentFlowRate={currentFlowRate} 
                TokenName={TokenName} 
                TokenID={TokenID}
                timestamp={createdAtTimestamp}
              />
            </div>
          );
        })
        }
    </div>
  );
};

export default StreamManager;
