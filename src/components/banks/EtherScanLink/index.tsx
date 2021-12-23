import React, { FC } from 'react';
import cx from 'classnames';
import styles from './styles.module.scss';

type Props = {
  path: string,
  hash: string | null,
  className?: string,
};

export const EtherscanLink: FC<Props> = ({ path, hash, className }) => {
  const uri = () => {
    switch (Number(process.env.REACT_APP_CHAIN_ID)) {
      case 1: {
        return `https://etherscan.io/${path}/`;
      }
      case 4: {
        return `https://rinkeby.etherscan.io/${path}/`;
      }
      case 137: {
        return `https://polygonscan.com/${path}/`;
      }
      default: {
        return `https://etherscan.io/${path}/`;
      }
    }
  };

  return (
    <div className={cx(styles.etherscanLink, className)}>
      <a href={`${uri()}${hash}`} target="_blank" rel="noopener noreferrer">
        view on Polygonscan
      </a>
    </div>
  );
};
