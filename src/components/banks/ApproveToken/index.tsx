import React, { FC } from 'react';
import { Button } from 'antd';
import { LoadingWrapper } from 'components/common/LoadingWrapper';
import styles from './styles.module.scss';

type Props = {
  isLoadingApprove: boolean,
  onApproveClick: () => void,
};

export const ApproveToken: FC<Props> = ({
  isLoadingApprove,
  onApproveClick,
}) => (
  <div className="ApproveToken">
    <LoadingWrapper
      isLoading={isLoadingApprove}
      classNameLoader={styles.loader}
    >
      <Button
        shape="round"
        size="large"
        className="purpleoutlined"
        onClick={onApproveClick}
      >
        give allowance
      </Button>
    </LoadingWrapper>
  </div>
);
