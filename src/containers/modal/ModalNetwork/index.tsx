import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { mainSwitchNetwork } from 'store/main/actionCreators';
import ButtonNew from 'components/common/ButtonNew';
import { chainSettings } from 'constants/chainSettings';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

export const ModalNetwork:React.FC = () => {
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(mainSwitchNetwork());
  }, [dispatch]);
  const { t } = useTranslation();

  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{t('Switch to Polygon Network')}</p>
      <p className={styles.desc}>
        {t('Metamask Users: Use the following settings, or the button below.')}
      </p>
      <p className={styles.desc}>
        {t('Other wallets: Make sure your wallet supports Polygon.')}
      </p>
      <ul className={styles.params}>
        <li>
          <span className={styles.label}>name - </span>
          Polygon
        </li>
        <li>
          <span className={styles.label}>chainId - </span>
          137
        </li>
        <li>
          <span className={styles.label}>RPC URL - </span>
          {chainSettings.rpcUrls}

        </li>
        <li>
          <span className={styles.label}>Block Explorer URL - </span>
          https://polygonscan.com
        </li>
      </ul>
      <ButtonNew
        onClick={handleClick}
        className={styles.button}
      >
        {t('switch to polygon')}
      </ButtonNew> 

    </div>
  );
};
