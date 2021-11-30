import React from 'react';
import { trimPad } from 'utils/balances';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import styles from './styles.module.scss';

// Get SUSHI APY
// Rewards APY
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

// Fees APY
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

const retrieveAPY = async (): Promise<{ apy: number, rewardsApy: number, feesApy: number }> => {
  // Retrieve feesAPY
  const feesResp = await axios.post(feesUrl, { query: feesQuery });
  const { pair } = feesResp.data.data;
  // const yesterdayFees = (pair.dayData[0].volumeUSD /
  // pair.dayData[0].reserveUSD) * 365 * 0.25; // 0.05 goes to xsushi holders
  let lastweekFees = pair.dayData.slice(0, 7)
    .map((el: any) => (parseFloat(el.volumeUSD) / parseFloat(el.reserveUSD)), 0);
  lastweekFees = lastweekFees.reduce(
    (acc: number, el: number) => (el && el !== Infinity ? acc + el : acc), 0,
  );
  const feesApy = lastweekFees * 52 * 0.25; // On the 0.3% paid to LP, 0.05% goes to xSushi stakers

  // Convert to usdc reward using tokens prices and pool volume
  const coingeckoResp = await axios.get(coingeckoUrl);
  const maticPrice = coingeckoResp.data['matic-network'].usd;
  const sushiPrice = coingeckoResp.data.sushi.usd;

  // Rertrieve Rewards APY (sushi and wmatic)
  const rewardsResp = await axios.post(rewardsUrl, { query: rewardsQuery });
  const pool = rewardsResp.data.data.pools[0];
  const maticRewardsPerSecond = (pool.rewarder.rewardPerSecond *
      pool.allocPoint) / pool.miniChef.totalAllocPoint;
  const sushiRewardsPerSecond = (pool.miniChef.sushiPerSecond *
      pool.allocPoint) / pool.miniChef.totalAllocPoint;

  // Convert perSecond to perDay to usd_perpool_perday to APY
  const maticRewardsPerDay = (maticRewardsPerSecond / 1e18) * 86400; // 60*60*24=60 * 60 * 24
  const sushiRewardsPerDay = (sushiRewardsPerSecond / 1e18) * 86400;
  const rewardsUsdPoolPerYear = 365.25 * (maticRewardsPerDay * maticPrice +
    sushiRewardsPerDay * sushiPrice);

  const rewardsApy = (rewardsUsdPoolPerYear / parseFloat(pair.dayData[0].reserveUSD)) * 100;

  return {
    apy: rewardsApy + feesApy,
    rewardsApy,
    feesApy,
  };
};

type Props = {
} & React.HTMLProps<HTMLSpanElement>;

export default function LpApy(props: Props) {
  const [apy, setApy] = React.useState('');
  const [rewardsApy, setRewardsApy] = React.useState('');
  const [feesApy, setFeesApy] = React.useState('');

  React.useEffect(() => {
    retrieveAPY().then((p) => {
      setApy(p.apy.toFixed(2));
      setRewardsApy(p.rewardsApy.toFixed(2));
      setFeesApy(p.feesApy.toFixed(2));
    });
  }, []);

  return (
    <div className={styles.balance_container}>
      <span {...props} className={styles.balance} data-tip data-for="apyTooltip">{`APY: ${trimPad(apy, 2)} %`}</span>
      <ReactTooltip
        id="apyTooltip"
        place="right"
        effect="solid"
        className={styles.apyTooltip}
      >
        <span className={styles.apyTooltip_span}>
          {`Fees: ${trimPad(feesApy, 2)}% / Rewards: ${trimPad(rewardsApy, 2)}%`}
        </span>
      </ReactTooltip>
    </div>
  );
}
