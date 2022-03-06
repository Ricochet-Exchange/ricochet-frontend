import React, { FC, useState } from 'react';
import copy from 'assets/images/copy.svg';
import ReactTooltip from 'react-tooltip';
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
    <div style={{ display: 'inline-block' }}>
      <div
        aria-hidden="true"
        data-for="copiable-address"
        data-tip={clipboardTitle}
        onClick={copyToClipboard}
        className={styles.wrapper}
      >
        <span>
          {address.slice(0, 7)}
          ...
          {address.slice(-4)}
        </span>
        <img src={copy} alt="copy icon" />
      </div>
      <ReactTooltip
        id="copiable-address"
        place="top"
        effect="solid"
        multiline
        className={styles.address_tooltip_wrapper}
      >
        <span className={styles.copiable_address_tooltip}>{clipboardTitle}</span>
      </ReactTooltip>
    </div>
  );
};
