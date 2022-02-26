import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { InvestNav } from '../../../components/layout/InvestNav';
import { UserSettings } from '../../../components/layout/UserSettings';
import { RICAddress } from '../../../constants/polygon_config';
import { useLang } from '../../../hooks/useLang';
import { useShallowSelector } from '../../../hooks/useShallowSelector';
import { selectMain } from '../../../store/main/selectors';
import { distributionsGetData } from '../../../store/distributions/actionCreators';
import { selectDistributions } from '../../../store/distributions/selectors';
import { DistributionPanel } from '../../../pages/Distributions/layout';
import { LoadingWrapper } from '../../../components/common/LoadingWrapper';

interface IProps {
}

export const DistributionContainer: React.FC<IProps> = () => {
  const { t } = useLang();

  const dispatch = useDispatch();
  const mainState = useShallowSelector(selectMain);
  const {
    address, balances, isLoading, coingeckoPrices,
  } = mainState;
  
  const distributionsState = useShallowSelector(selectDistributions);
  const { isLoading: isLoadingDistributions, distributions } = distributionsState;

  useEffect(() => {
    if (!isLoading) dispatch(distributionsGetData());
  }, [isLoading]);
  
  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.container}>
        <div className={styles.input_wrap} />
        <div className={styles.headers}>
          <div className={styles.header}>{t('PUBLISHER')}</div>
          <div className={styles.header}>{t('TOKEN')}</div>
          <div className={styles.header}>{t('STARTED ON')}</div>
          <div className={styles.header}>{t('POOL %')}</div>
          <div className={styles.header}>{t('LAST DISTRIBUTION DATE')}</div>
          <div className={styles.header}>
            {t('DISTRIBUTION RECEIVED SO FAR')}
          </div>
        </div>
        <div className={styles.content}>
          {distributions.map((distribution) => (
            <div className={styles.panel} key={`${distribution.id}`}>
              <DistributionPanel
                distribution={distribution}
                coingeckoPrice={coingeckoPrices && coingeckoPrices[distribution.token]}
              />
            </div>
          ))}
          <div className={styles.settings_mob}>
            <UserSettings
              className={styles.dot}
              ricBalance={balances && balances[RICAddress]}
              account={address || 'Connect Wallet'}
            />
          </div>
        </div>
        
        {isLoading || isLoadingDistributions ? (
          <LoadingWrapper
            isLoading={isLoading || isLoadingDistributions}
            classNameLoader={styles.loader}
          />
        ) : null}

        <div>
          <span className={styles.fee_disclaimer}>
            {t('Ricochet takes a 2% fee on swaps.')}
          </span>
        </div>
      </div>
    </div>
  );
};
