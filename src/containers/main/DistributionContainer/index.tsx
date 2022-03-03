import React, {
  ChangeEvent, useCallback, useEffect, useState, 
} from 'react';
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
import { TextInput } from '../../../components/common/TextInput';
import { FontIcon, FontIconName } from '../../../components/common/FontIcon';

interface IProps {
}

export const DistributionContainer: React.FC<IProps> = () => {
  const { t } = useLang();
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const mainState = useShallowSelector(selectMain);
  const {
    address, balances, isLoading, coingeckoPrices,
  } = mainState;
  
  const distributionsState = useShallowSelector(selectDistributions);
  const { distributions, isLoading: isDistributionLoading } = distributionsState;

  const handleSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    console.log(value);
  }, []);
  
  useEffect(() => {
    if (!isLoading) dispatch(distributionsGetData());
  }, [isLoading]);

  const filteredList = distributions.filter(
    (distribution) => distribution.id.includes(search.toLowerCase()),
  );
  return (
    <div className={styles.outer_container}>
      <InvestNav />
      <div className={styles.container}>
        <div className={styles.input_wrap}>
          <TextInput
            value={search}
            placeholder={t('Search by Address')}
            onChange={handleSearch}
            className={styles.input}
            containerClassName={styles.container_input}
            left={<FontIcon name={FontIconName.Search} className={styles.search} size={16} />}
          />
        </div>
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
          {isLoading && Array(5)
            .map((id) => (
              <div className={styles.panel} key={`${id}`}>
                <DistributionPanel
                  distribution={undefined}
                  isLoading={isDistributionLoading}
                />
              </div>
            ))}
          {!isLoading && filteredList.map((distribution) => (
            <div className={styles.panel} key={`${distribution.id}`}>
              <DistributionPanel
                distribution={distribution}
                coingeckoPrice={coingeckoPrices && coingeckoPrices[distribution.token]}
                isLoading={isDistributionLoading}
              />
            </div>
          ))}
          {!isLoading && filteredList.length === 0 && (
          <div className={styles.empty_state}>
            <FontIcon name={FontIconName.Search} size={30} />
            <span className={styles.empty_state_text}>
              <div>{t('No results found')}</div>
            </span>
          </div>
          )}
          <div className={styles.settings_mob}>
            <UserSettings
              className={styles.dot}
              ricBalance={balances && balances[RICAddress]}
              account={address || 'Connect Wallet'}
            />
          </div>
        </div>
        <div>
          <span className={styles.fee_disclaimer}>
            {t('Ricochet takes a 2% fee on swaps.')}
          </span>
        </div>
      </div>
    </div>
  );
};
