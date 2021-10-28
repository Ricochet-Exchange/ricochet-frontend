import React, {
  FC,
} from 'react';
import styles from './styles.module.scss';
import ButtonNew from '../../common/ButtonNew';

interface IProps {
  isUpgrade: boolean,
  onClickApprove?: () => void,
  onClickUpgrade?: () => void,
  onClickDowngrade?: () => void,
  onClickMax?: () => void,
  isLoading?: boolean;
  disabledApprove?: boolean;
}

export const UpgradeDowngradeButtons: FC<IProps> = ({
  isUpgrade,
  isLoading,
  disabledApprove,
  onClickApprove = () => {},
  onClickUpgrade = () => {},
  onClickDowngrade = () => {},
  onClickMax = () => {},
}) => (
  <div>
    {isUpgrade 
      ? (
        <div className={styles.buttons_upgrade}>
          <div className={styles.max_wrap}>
            <ButtonNew
              color="secondary"
              disabled={isLoading || disabledApprove}
              onClick={onClickMax}
              className={styles.max}
            >
              Max

            </ButtonNew>
          </div>
          <div className={styles.approve_wrap}>
            <ButtonNew
              color="secondary"
              disabled={isLoading || disabledApprove}
              onClick={onClickApprove}
              className={styles.approve}
            >
              Approve

            </ButtonNew>
          </div>
          <div className={styles.upgrade_wrap}>
            <ButtonNew
              color="primary"
              disabled={isLoading || !disabledApprove} 
              onClick={onClickUpgrade}
              className={styles.upgrade}
            >
              Upgrade
            </ButtonNew>
          </div>
        </div>
      )
      : (
        <div className={styles.downgrade_wrap}>
          <ButtonNew
            color="primary"
            disabled={isLoading} 
            onClick={onClickDowngrade}
            className={styles.downgrade}
          >
            Downgrade
          </ButtonNew>
        </div>
      )}
  </div>
);
