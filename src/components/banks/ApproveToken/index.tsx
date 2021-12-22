import React, { FC } from 'react';
import { Button } from 'components/common/Button';
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
  <div className={styles.approveToken}>
    <LoadingWrapper
      isLoading={isLoadingApprove}
      classNameLoader={styles.loader}
    >
      <Button
        className={styles.button}
        onClick={onApproveClick}
        label="give allowance"
      />
    </LoadingWrapper>
  </div>
);
