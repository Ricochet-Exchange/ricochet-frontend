import { TextInput } from 'components/common/TextInput';
import React, { ChangeEvent, FC } from 'react';
import { useTranslation } from 'i18n';
import ReactTooltip from 'react-tooltip';
import ButtonNew from '../../common/ButtonNew';
import { Coin } from '../../../constants/coins';
import styles from './styles.module.scss';

interface IProps {
	value: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onClickStart: () => void;
	onClickStop: () => void;
	coin: Coin;
	isLoading?: boolean;
	isReadOnly?: boolean;
	personalFlow: string;
	shareScaler: number;
	indexVal?: number;
	coinBalanceA?: string;
}

export const CoinRateForm: FC<IProps> = ({
	value,
	onChange,
	onClickStart,
	onClickStop,
	placeholder,
	coin,
	isLoading,
	isReadOnly,
	personalFlow,
	shareScaler,
	indexVal,
	coinBalanceA,
}) => {
	const { t } = useTranslation();
	// Security Deposit is 4 hours worth of stream, so (4*60*60)/(30*24*60*60) = 1/180
	return (
		<div className={styles.input_container}>
			<div className={styles.input_wrap}>
				<TextInput
					value={value}
					className={styles.input}
					onChange={onChange}
					containerClassName={styles.container_input}
					placeholder={placeholder}
					right={<div className={styles.right}>{`${coin}x/mo.`}</div>}
					type="number"
				/>
			</div>
			<div className={styles.buttons}>
				<div className={styles.start_wrap}>
					<span data-tip data-for={`depositTooltip-${indexVal}`}>
						<ButtonNew
							loaderColor="white"
							color="primary"
							onClick={onClickStart}
							className={styles.start}
							disabled={
								isReadOnly ||
								isLoading ||
								!Boolean(parseInt(coinBalanceA ?? '') > 0) ||
								!value ||
								((Math.floor(((parseFloat(value) / 2592000) * 1e18) / shareScaler) * shareScaler) /
									1e18) *
									2592000 ===
									0
							}
							isLoading={isLoading}
						>
							{t('Start')}/{t('Edit')}
						</ButtonNew>
					</span>
				</div>
				<div className={styles.stop_wrap}>
					{parseFloat(personalFlow) > 0 && (
						<ButtonNew
							loaderColor="#363B55"
							color="secondary"
							onClick={onClickStop}
							className={styles.stop}
							disabled={isReadOnly || isLoading}
							isLoading={isLoading}
						>
							{t('Stop')}
						</ButtonNew>
					)}
				</div>
				<div style={{ flexBasis: '100%', height: '0' }}> </div>

				{parseInt(coinBalanceA ?? '') === 0 && parseInt(value) ? (
					<ReactTooltip
						id={`depositTooltip-${indexVal}`}
						place="right"
						effect="solid"
						multiline
						className={styles.depositTooltip}
					>
						<span className={styles.depositTooltip_span}>No tokens, deposit in wallet page </span>
					</ReactTooltip>
				) : Boolean(parseInt(coinBalanceA ?? '') < parseInt(value)) ? (
					<ReactTooltip
						id={`depositTooltip-${indexVal}`}
						place="right"
						effect="solid"
						multiline
						className={styles.depositTooltip}
					>
						<span className={styles.depositTooltip_span}>Not enough tokens, deposit in wallet page </span>
					</ReactTooltip>
				) : value && coin && coinBalanceA ? (
					<ReactTooltip
						id={`depositTooltip-${indexVal}`}
						place="right"
						effect="solid"
						multiline
						className={styles.depositTooltip}
					>
						{
							<span className={styles.depositTooltip_span}>
								The amount per month will be rounded off to
								<span style={{ fontWeight: 700 }}>
									{` ${(
										((Math.floor(((parseFloat(value) / 2592000) * 1e18) / shareScaler) *
											shareScaler) /
											1e18) *
										2592000
									).toFixed(6)} ${coin} `}
								</span>
								so the contracts can evenly divide it and it will take a security deposit of
								<span style={{ fontWeight: 700 }}>
									{` ${(parseFloat(value) / 180.0).toFixed(6)} ${coin} `}
								</span>
								from your balance. The Deposit will be refunded in full when you close the stream or
								lost if your balance hits zero with the stream still open.
							</span>
						}
					</ReactTooltip>
				) : null}
				<div />
			</div>
		</div>
	);
};
