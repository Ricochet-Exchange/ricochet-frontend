import React, { FC, MouseEvent } from 'react';
import { Button } from 'antd';

import './VaultActions.scss';

type Props = {
  section: string,
  activeTransaction: string,
  onClick: (e: MouseEvent) => void,
  transactionHash: string,
};

export const VaultActions: FC<Props> = ({
  section,
  activeTransaction,
  onClick,
  transactionHash,
}) => (
  // can use activeTransaction to set a class on active state
  <div className="VaultActions">
    {section === 'locked' ? (
      <>
        <Button
          id="withdraw"
          type="default"
          shape="round"
          size="large"
          className="purpleoutlined"
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        >
          withdraw
        </Button>
        <Button
          id="deposit"
          type="primary"
          shape="round"
          size="large"
          className="purplebutton"
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        >
          deposit
        </Button>
      </>
    ) : (
      <>
        <Button
          id="borrow"
          type="default"
          shape="round"
          size="large"
          className="purpleoutlined"
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        >
          borrow
        </Button>
        <Button
          id="repay"
          type="primary"
          shape="round"
          size="large"
          className="purplebutton"
          disabled={Boolean(transactionHash || activeTransaction)}
          onClick={onClick}
        >
          repay
        </Button>
      </>
    )}
  </div>
);
