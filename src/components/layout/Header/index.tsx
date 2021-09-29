import React from 'react';
import { trimPad } from 'utils/balances';
import logo from 'assets/images/logo.png';
import styles from './styles.module.scss';

type Props = {
  account: string;
  ricBalance?: string;
};

export const Header:React.FC<Props> = ({ account, ricBalance = '' }) => (
  <header className={styles.header}>
    <div className={styles.left}>
      <img src={logo} alt="icon" className={styles.logo} />
      <div className={styles.account}>
        {account.substring(0, 10)}
        ...
      </div>
    </div>
    <div className={styles.right}>
      <div className={styles.links}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          href="./RicochetExchangeWhitepaper.pdf"
        >
          Whitepaper
        </a>
        &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          href="https://docs.ricochet.exchange/"
        >
          Docs       
        </a>
        &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          href="https://discord.gg/mss4t2ED3y"
        >
          Discord
        </a>
      </div>
      <div className={styles.ric}>
        {`${trimPad(ricBalance, 6)} RIC`}
      </div>
    </div>
  </header>
);
