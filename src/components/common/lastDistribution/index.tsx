import React from 'react';
import styles from './styles.module.scss';
import { getLastDistributionAtRexMarket, getLastDistributionAtRexLaunchPad } from 'utils/getLastDistributions';
import { useShallowSelector } from '../../../hooks/useShallowSelector';
import { selectMain } from '../../../store/main/selectors';
import { useLocation } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ReactTimeAgo from 'react-time-ago';
TimeAgo.addDefaultLocale(en)

interface Props{
}

export const ShowDistribution: React.FC<Props> = () => {
  const { web3, } = useShallowSelector(selectMain);
  const [lastDistribution, setLastDistribution]= React.useState<Date>();
  const location = useLocation();

  React.useEffect(() => {
    if (web3?.currentProvider === null) return;
      if(location.pathname == "/invest/rex-launchpad"){
        getLastDistributionAtRexLaunchPad(web3).then((p) => {
          setLastDistribution(p);
        });
      }

      if(location.pathname == "/invest/rex-market"){
        getLastDistributionAtRexMarket(web3).then((p) => {
          setLastDistribution(p);
        });
      }
  },[location, web3]);

  return(
    <div className={styles.container}> 
      {
        lastDistribution ?
          <div className={styles.container}>Last Distribution: <ReactTimeAgo date={lastDistribution}/></div>
        :
        null
      }      
    </div>
  )
};
