import React from 'react';
import { trimPad } from 'utils/balances';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import styles from './styles.module.scss';

// Get SUSHI APR
// Rewards APR
const rewardsUrl = 'https://api.thegraph.com/subgraphs/name/sushiswap/matic-minichef'; // https://thegraph.com/hosted-service/subgraph/sushiswap/matic-minichef
const rewardsQuery = `
  { # or pool(id: 1) which is usdc/weth
    pools(
      first: 5
      where: {
        pair_in: [
          "0x34965ba0ac2451a34a0471f04cca3f990b8dea27" # USDC/WETH on polygon
        ]
      }
    ) {
      id
      pair
      allocPoint
      miniChef {
        id
        totalAllocPoint
        sushi
        sushiPerSecond
        poolCount
      }
      rewarder {
        id
        rewardToken
        rewardPerSecond
        
      }
    }
  }
  `; 

// Fees APR
const feesUrl = 'https://api.thegraph.com/subgraphs/name/sushiswap/matic-exchange'; // https://thegraph.com/hosted-service/subgraph/sushiswap/matic-exchange
const feesQuery = `
{
    pair(
      id: "0x34965ba0ac2451a34a0471f04cca3f990b8dea27"
    ) {
      id
      liquidityProviderCount
      dayData (
        orderBy: date 
        orderDirection: desc
        first: 365
      ) {
        volumeUSD
        reserveUSD
        date
      }
    }
}
`;
// Get coingecko price feed
const coingeckoUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=matic-network%2Csushi&vs_currencies=usd';

const retrieveAPR = async (): Promise<{ apr: number, rewardsApr: number, feesApr: number }> => {
  // Retrieve feesAPR
  const feesResp = await axios.post(feesUrl, { query: feesQuery });
  const { pair } = feesResp.data.data;
  // const yesterdayFees = (pair.dayData[0].volumeUSD / 
  // pair.dayData[0].reserveUSD) * 365 * 0.25; // 0.05 goes to xsushi holders 
  let lastweekFees = pair.dayData.slice(0, 7)
    .map((el: any) => (parseFloat(el.volumeUSD) / parseFloat(el.reserveUSD)), 0);
  lastweekFees = lastweekFees.reduce(
    (acc: number, el: number) => (el && el !== Infinity ? acc + el : acc), 0,
  );
  const feesApr = lastweekFees * 52 * 0.25; // On the 0.3% paid to LP, 0.05% goes to xSushi stakers
      
  // Convert to usdc reward using tokens prices and pool volume
  const coingeckoResp = await axios.get(coingeckoUrl);
  const maticPrice = coingeckoResp.data['matic-network'].usd;
  const sushiPrice = coingeckoResp.data.sushi.usd;
  
  // Rertrieve Rewards APR (sushi and wmatic)
  const rewardsResp = await axios.post(rewardsUrl, { query: rewardsQuery });
  const pool = rewardsResp.data.data.pools[0];
  const maticRewardsPerSecond = (pool.rewarder.rewardPerSecond * 
      pool.allocPoint) / pool.miniChef.totalAllocPoint;
  const sushiRewardsPerSecond = (pool.miniChef.sushiPerSecond * 
      pool.allocPoint) / pool.miniChef.totalAllocPoint;

  // Convert perSecond to perDay to usd_perpool_perday to APR
  const maticRewardsPerDay = (maticRewardsPerSecond / 1e18) * 86400; // 60*60*24=60 * 60 * 24
  const sushiRewardsPerDay = (sushiRewardsPerSecond / 1e18) * 86400;
  const rewardsUsdPoolPerYear = 365.25 * (maticRewardsPerDay * maticPrice + 
    sushiRewardsPerDay * sushiPrice); 

  const rewardsApr = (rewardsUsdPoolPerYear / parseFloat(pair.dayData[0].reserveUSD)) * 100;

  return {
    apr: rewardsApr + feesApr, 
    rewardsApr, 
    feesApr,
  };
};

type Props = {
} & React.HTMLProps<HTMLSpanElement>;

const getApr = async (): Promise<string> => (await retrieveAPR()).apr.toFixed(2);
const getRewardsApr = async (): Promise<string> => (await retrieveAPR()).rewardsApr.toFixed(2);
const getFeesApr = async (): Promise<string> => (await retrieveAPR()).feesApr.toFixed(2);

export default function LpApr(props: Props) {
  const [apr, setApr] = React.useState('');
  const [rewardsApr, setRewardsApr] = React.useState('');
  const [feesApr, setFeesApr] = React.useState('');

  React.useEffect(() => {
    getApr().then((p) => setApr(p));
    getRewardsApr().then((p) => setRewardsApr(p));
    getFeesApr().then((p) => setFeesApr(p));
  });

  return (
    <div className={styles.balance_container}>
      <span {...props} className={styles.balance} data-tip data-for="aprTooltip">{`APR: ${trimPad(apr, 2)} %`}</span>
      <ReactTooltip 
        id="aprTooltip" 
        place="right" 
        effect="solid" 
        className={styles.aprTooltip}
      >
        <span className={styles.aprTooltip_span}>
          {`Fees: ${trimPad(feesApr, 2)}% / Rewards: ${trimPad(rewardsApr, 2)}%`}
        </span> 
      </ReactTooltip>
    </div>
  );
}
