import React, { FC, useState } from 'react';
import copy from 'assets/images/copy.svg';
import styles from './styles.module.scss';

type CopiableAddressProps = {
  address: string;
};

export const CopiableAddress: FC<CopiableAddressProps> = ({ address }) => {
  const [clipboardTitle, setClipboardTitle] = useState('Copy address');

  const copyToClipboard = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(address);
    setClipboardTitle('Copied !');
  };

  return (
    <div aria-hidden="true" data-tip={clipboardTitle} onClick={copyToClipboard} className={styles.wrapper}>
      <span>
        {address.slice(0, 7)}
        ...
        {address.slice(-4)}
      </span>
      <img src={copy} alt="copy icon" />
    </div>
  );
};
