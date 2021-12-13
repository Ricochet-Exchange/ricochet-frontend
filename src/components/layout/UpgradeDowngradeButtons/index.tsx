import React, {
  FC,
} from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './styles.module.scss';
import ButtonNew from '../../common/ButtonNew';

interface IProps {
  isUpgrade: boolean,
  onClickApprove?: () => void,
  onClickUpgrade?: () => void,
  onClickDowngrade?: () => void,
  isLoading?: boolean;
  disabledApprove?: boolean;
  showWarningToolTip?:boolean;
}

export const UpgradeDowngradeButtons: FC<IProps> = ({
  isUpgrade,
  isLoading,
  disabledApprove,
  showWarningToolTip,
  onClickApprove = () => {},
  onClickUpgrade = () => {},
  onClickDowngrade = () => {},
}) => (
  <div>
    {isUpgrade 
      ? (
        <div className={styles.buttons_upgrade}>
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
            data-tip
            data-for="downgradeTooltip"
            color="primary"
            disabled={isLoading} 
            onClick={onClickDowngrade}
            className={styles.downgrade}
          >
            {showWarningToolTip ? 'Downgrade ⚠️' : 'Downgrade'}
          </ButtonNew>
          {showWarningToolTip && (
            <ReactTooltip
              id="downgradeTooltip"
              place="right"
              effect="solid"
              className={styles.downgrade_wrap}
              multiline
            >
              <span
                className={styles.downgrade_wrap_span}
              >
                Downgrading your tokens could lead to the ongoing stream running out of funds
                and you losing your deposit!
              </span>
            </ReactTooltip>
          )}
        </div>
      )}
  </div>
);
