import React, {
  useCallback, useEffect, useState, 
} from 'react';
import { Framework, IStreamFlowUpdatedEvent } from '@superfluid-finance/sdk-core';
import * as Sentry from '@sentry/react';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import type { ActivityEvents } from 'types/activity';
import { SignInButton } from 'components/banks/SignInButton';
import { useDispatch } from 'react-redux';
import { connectWeb3Modal } from 'store/main/actionCreators';
import { EmptyPage } from 'components/common/EmptyPage';
import { LoadingPopUp } from 'components/common/LoadingPopUp';
import { StreamActivityWrapper } from '../StreamActivityWrapper';
import styles from './styles.module.scss';

export default function RecentStreamActivity() {
  const [activities, setActivities] = useState<ActivityEvents[]>([]);
  const dispatch = useDispatch();
  const { web3, address: account } = useShallowSelector(selectMain);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [flowUpdatedEvents, setFlowUpdatedEvents] = useState<IStreamFlowUpdatedEvent[]>([]);
 
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
      
          const { data: events } = await web3ModalSf.query.listEvents({ account });
   
          const { data: sentStream } = await web3ModalSf.query.listStreams({ sender: account });
          const streams = [...sentStream];
          const temp: IStreamFlowUpdatedEvent[] = [];
          streams.forEach((stream) => {
            stream.flowUpdatedEvents.forEach((event) => {
              temp.push(event);
            });
          });
          if (mounted) {
            setActivities(events.filter(
              (event) => 
                event.name === 'FlowUpdated',
            ) as ActivityEvents[]);

            setFlowUpdatedEvents(temp);
          }
        } catch (e) {
          console.error('Recent Activity Error: ', e);
          Sentry.captureException(e);
        }
        setIsLoading(false);
      })();
    }
    return () => {
      mounted = false;
    };
  }, [web3, account]);

  const connectWallet = useCallback(() => {
    dispatch(connectWeb3Modal());
  }, [dispatch]);

  const Wrapper = () => {
    if (!account) {
      return (
        <div className={styles.connect_wallet_wrapper}>
          <p>Please connect wallet to see your recent activities.</p>
          <SignInButton onClick={connectWallet} />
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className={styles.loading_wrapper}>
          <LoadingPopUp />
        </div>
      );
    }

    if (activities.length === 0) {
      return <EmptyPage />;
    }

    return (
      <div className={styles.container}>
        <h1 style={{ marginLeft: '1em' }}>Activity History</h1>
        {activities.map((activity: any, index: number) => {
          const { timestamp, id } = activity;
          const date = new Date(timestamp * 1000).toString();
          const day = date.split(' ').slice(1, 4).join(' ');

          const prevDay = index - 1 >= 0 ? 
            new Date(activities[index - 1].timestamp * 1000)
              .toString().split(' ')
              .slice(1, 4)
              .join(' ') :
            '';

          const isNotSameDay = prevDay !== day;
        
          return (
            <section className={styles.parent_wrapper} key={id}>
              {(isNotSameDay || index === 0) && (
              <div className={styles.header}>
                {day}
              </div>
              )}
              <div
                className={styles.container}
                role="button"
                aria-hidden="true"
              >
                <StreamActivityWrapper
                  event={activity}
                  account={account}
                  flowActionType={
                    flowUpdatedEvents.find((event) => event.id === id)?.type
                  }
                />
              </div>
            </section>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div className={styles.wrapper}>
        <Wrapper />
      </div>
    </div>
  );
}
