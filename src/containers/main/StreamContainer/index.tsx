import React, { useState, useCallback } from 'react';
import { StreamForm } from 'components/streaming/StreamForm';
import { useShallowSelector } from 'hooks/useShallowSelector';
import RecentStreamActivity from 'components/streaming/RecentStreamActivity';
import { selectMain } from 'store/main/selectors';
import { Framework } from '@superfluid-finance/sdk-core';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { ethers } from 'ethers';
import FailCard from 'components/streaming/FailCard';
import { showErrorToast, showSuccessToast } from '../../../components/common/Toaster';
import styles from './styles.module.scss';

interface IProps {}

export const StreamContainer: React.FC<IProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { address: account } = useShallowSelector(selectMain);
  const [recipient, setRecipient] = useState('');
  const [superToken, setSuperToken] = useState('');
  const [flowRate, setFlowRate] = useState('');
  const [PanelOpen, TogglePanel] = useState(false);
  const [transactionSuccess, ToggleTransaction] = useState(false);
  const [transactionFailed, ToggleFail] = useState(false);
  const [recentActivity, ToggleRecent] = useState(false);

  async function createNewFlow() {
    setIsLoading(true);
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
        showSuccessToast('Stream opened successfully');
        ToggleTransaction(true);     
      } catch (e) {
        console.log(e);
        showErrorToast('Could not open stream, check if you have an open stream already.');
        ToggleTransaction(false);
        ToggleFail(true);
      }
    }
    setIsLoading(false);
  }
  
  const handleStartStream = useCallback(() => {
    createNewFlow();
  }, [recipient, flowRate, superToken]);

  const updateFlowRate = (flow: string):void => {
    setFlowRate(flow);
  };

  const updateRecipient = (address: string):void => {
    setRecipient(address);
  };

  const updateSuperToken = (token: string):void => {
    setSuperToken(token);
  };

  const renderStream = () => {
    if (!transactionSuccess && !transactionFailed && !recentActivity) {
      return (
        <div className={styles.stream_form_container}>
          <button 
            onClick={() => { 
              ToggleFail(false);
              ToggleTransaction(false);
              ToggleRecent(!recentActivity);
            }} 
            className={styles.recent_btn}
          >
            Recent Activity
          </button>
          <button 
            onClick={() => {
              TogglePanel(false); 
              ToggleFail(false);
              ToggleTransaction(false);
            }} 
            className={styles.close_btn}
          >
            <FontIcon name={FontIconName.Close} className={styles.close} size={24} />
          </button>

          <h2 className={styles.title}>Send Money</h2>
          <StreamForm 
            loading={isLoading} 
            updateRecipient={updateRecipient} 
            updateFlowRate={updateFlowRate} 
            updateSuperToken={updateSuperToken} 
            createFlow={handleStartStream}
          />
        </div>
      );
    }
    if (transactionSuccess && !recentActivity) {
      return (
        <div className={styles.stream_form_container}>   
          <>
            <h3 className={styles.success}>Success</h3>
            <h3 className={styles.result}>
              Your stream has been created, you can view or edit 
              your stream in the Activity Page.
            </h3>
            <button 
              onClick={() => { 
                ToggleFail(false);
                ToggleTransaction(false);
                ToggleRecent(!recentActivity);
              }} 
              className={styles.recent_btn}
            >
              Back
            </button>
            <RecentStreamActivity />
          </>
        </div>
      );
    }
    if (transactionFailed && !recentActivity) {
      return (
        <>
          <button 
            onClick={() => {
              TogglePanel(false); 
              ToggleFail(false);
              ToggleTransaction(false);
            }} 
            className={styles.close_btn}
          >
            <FontIcon name={FontIconName.Close} className={styles.close} size={24} />
          </button>
          <h2 className={styles.warning}>
            Stream Failed
          </h2>
          
          <FailCard />
        </>
       
      );
    }
    if (recentActivity) {
      return (
        <div className={styles.stream_form_container}> 
          
          <>
            <button 
              onClick={() => { 
                ToggleFail(false);
                ToggleTransaction(false);
                ToggleRecent(!recentActivity);
              }} 
              className={styles.recent_btn}
            >
              Back
            </button>
            <button 
              onClick={() => {
                TogglePanel(false); 
                ToggleFail(false);
                ToggleTransaction(false);
                ToggleRecent(false);
              }} 
              className={styles.close_btn}
            >
              <FontIcon name={FontIconName.Close} className={styles.close} size={24} />
            </button>
            <RecentStreamActivity />
          </>

        </div>
      );
    }
  };
 
  return (
    <>
      <div className={styles.stream_button_container}>
        <button 
          className={styles.stream_button} 
          onClick={() => { TogglePanel(!PanelOpen); }}
          disabled={!account}
        >
          Send
        </button>  
      </div>

      {PanelOpen ? (
        <div className={styles.stream_panel_container}>
          {renderStream()}
        </div>
      )
        :
        ''}
    </>
  );
};
