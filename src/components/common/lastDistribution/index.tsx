import React from 'react';
import { getLastDistributionAtRexMarket, getLastDistributionAtRexLaunchPad } from 'utils/getLastDistributions';
import { useLocation } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import { useShallowSelector } from '../../../hooks/useShallowSelector';
import { selectMain } from '../../../store/main/selectors';
import styles from './styles.module.scss';

TimeAgo.addDefaultLocale(en);

interface Props{
}

export const ShowDistribution: React.FC<Props> = () => {
  const { web3 } = useShallowSelector(selectMain);
  const [lastDistribution, setLastDistribution] = React.useState<Date>();
  const [isLoading] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    if (web3?.currentProvider === null) return;
    if (location.pathname === '/invest/rex-launchpad') {
      getLastDistributionAtRexLaunchPad(web3).then((p) => {
        setLastDistribution(p);
      });
    }
    if (location.pathname === '/invest/rex-market') {
      getLastDistributionAtRexMarket(web3).then((p) => {
        setLastDistribution(p);
      });
    }
  }, [location, web3]);

  return (
    <div className={styles.container}>
      <div className={styles.container}>
        Last Distribution: 
        {
          lastDistribution ?
            <ReactTimeAgo date={lastDistribution} />
            :
            <LoadingWrapper isLoading={isLoading} classNameLoader={styles.loader} />
        }
      </div>
    </div>
  );
};
