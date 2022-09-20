import React, { FC } from 'react';
import ReactTooltip from 'react-tooltip';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import ButtonNew from '../../common/ButtonNew';

interface IProps {
	isUpgrade: boolean;
	onClickApprove?: () => void;
	onClickUpgrade?: () => void;
	onClickDowngrade?: () => void;
	isLoading?: boolean;
	disabledApprove?: boolean;
	showWarningToolTip?: boolean;
	isReadOnly?: boolean;
	val: string;
}

export const UpgradeDowngradeButtons: FC<IProps> = ({
	isUpgrade,
	isLoading,
	disabledApprove,
	showWarningToolTip,
	onClickApprove = () => {},
	onClickUpgrade = () => {},
	onClickDowngrade = () => {},
	isReadOnly,
	val,
}) => {
	const { t } = useTranslation();

	return (
		<div>
			{isUpgrade ? (
				<div className={styles.buttons_upgrade}>
					<div className={styles.approve_wrap}>
						<ButtonNew
							color="secondary"
							loaderColor="#363B55"
							disabled={isReadOnly || disabledApprove || !val.length}
							isLoading={isLoading}
							onClick={onClickApprove}
							className={styles.approve}
						>
							{t('Approve')}
						</ButtonNew>
					</div>
					<div className={styles.upgrade_wrap}>
						<ButtonNew
							data-tip
							data-for="downgradeToolTip"
							color="primary"
							loaderColor="white"
							disabled={isReadOnly || isLoading || !disabledApprove || !val.length}
							isLoading={isLoading}
							onClick={onClickUpgrade}
							className={styles.upgrade}
						>
							{t('Deposit')}
						</ButtonNew>
					</div>
				</div>
			) : (
				<div className={styles.downgrade_wrap}>
					<ButtonNew
						data-tip
						data-for="downgradeTooltip"
						color="primary"
						loaderColor="white"
						disabled={isReadOnly || isLoading}
						isLoading={isLoading}
						onClick={onClickDowngrade}
						className={styles.downgrade}
					>
						{showWarningToolTip ? `${t('Withdraw')} ⚠️` : t('Withdraw')}
					</ButtonNew>
					{showWarningToolTip && (
						<ReactTooltip
							id="downgradeTooltip"
							place="right"
							effect="solid"
							className={styles.downgrade_wrap}
							multiline
						>
							<span className={styles.downgrade_wrap_span}>
								{t(
									'Downgrading your tokens could lead to the ongoing stream running out of funds and you losing your deposit!',
								)}
							</span>
						</ReactTooltip>
					)}
				</div>
			)}
		</div>
	);
};
