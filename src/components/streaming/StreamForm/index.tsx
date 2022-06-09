import React, { useState } from 'react';
import {
	DAIxAddress,
	USDCxAddress,
	WETHxAddress,
	MKRxAddress,
	WBTCxAddress,
	MATICxAddress,
	SUSHIxAddress,
	IDLExAddress,
	RICAddress,
} from 'constants/polygon_config';
import { Loader } from 'components/common/Loader';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { blockInvalidChar } from 'utils/blockInvalidChars';
import { calculateFlowRate } from 'utils/calculateFlowRate';
import styles from './styles.module.scss';

interface IProps {
	updateRecipient: (arg: string) => void;
	updateFlowRate: (arg: string) => void;
	updateSuperToken: (arg: string) => void;
	loading: boolean;
	createFlow: () => void;
}

export const StreamForm: React.FC<IProps> = ({
	createFlow,
	updateRecipient,
	updateFlowRate,
	updateSuperToken,
	loading,
}) => {
	const [addressProvided, setAddressStatus] = useState(false);
	const [flowProvided, setFlowStatus] = useState(false);
	const [tokenProvided, setTokenStatus] = useState(false);
	const [time, setTime] = useState(1);
	const state = useShallowSelector(selectMain);

	const supportedCurrencies = [
		{
			currency: 'DAIx',
			address: DAIxAddress,
		},

		{
			currency: 'USDCx',
			address: USDCxAddress,
		},

		{
			currency: 'WETHx',
			address: WETHxAddress,
		},

		{
			currency: 'MKRx',
			address: MKRxAddress,
		},

		{
			currency: 'WBTCx',
			address: WBTCxAddress,
		},

		{
			currency: 'MATICx',
			address: MATICxAddress,
		},

		{
			currency: 'SUSHIx',
			address: SUSHIxAddress,
		},

		{
			currency: 'IDLEx',
			address: IDLExAddress,
		},

		{
			currency: 'RIC',
			address: RICAddress,
		},
	];

	const { balances } = state;

	return (
		<div className={styles.stream_form}>
			<div className={styles.input_container}>
				<label htmlFor="recipient" className={styles.input_label}>
					Wallet Address here
				</label>
				<input
					className={styles.input_field}
					type="text"
					id="recipient"
					placeholder="Receiver Address"
					onChange={async (e) => {
						if (e.target.value.length === 42) {
							await updateRecipient(e.target.value);
							setAddressStatus(true);
						}
					}}
				/>
			</div>

			<div className={styles.input_container}>
				<label className={styles.input_label} htmlFor="payment">
					Stream Duration
				</label>
				<input
					id="payment"
					className={styles.input_field}
					type="number"
					placeholder="Payment Amount"
					onKeyDown={blockInvalidChar}
					min={0}
					onChange={async (e) => {
						const newFlow = await calculateFlowRate(+e.target.value, time);
						if (newFlow) {
							await updateFlowRate(newFlow.toString());
							setFlowStatus(true);
						}
					}}
				/>
				<select
					name="Time"
					value={'1 Day'}
					onChange={(e) => {
						console.log(e.target.value);
					}}
				>
					<option value={1}>1 Hour</option>
					<option value={1}>1 Day</option>
					<option>1 Week</option>
					<option>1 Month</option>
				</select>
			</div>

			<div className={styles.input_container}>
				<label className={styles.input_label} htmlFor="supertoken">
					Supertoken
				</label>
				<select
					name="SuperTokens"
					id="supertoken"
					onChange={async (e) => {
						await updateSuperToken(e.target.value);
						setTokenStatus(true);
					}}
					className={styles.input_field}
				>
					<option value="" selected>
						Choose A Token
					</option>
					{balances
						? supportedCurrencies.map((currency) => {
								if (+balances[currency.address] > 0) {
									console.log(+balances[currency.address]);
									return <option value={`${currency.address}`}>{currency.currency}</option>;
								}
								return '';
						  })
						: ''}
				</select>
			</div>

			<button
				className={styles.input_field_submit}
				disabled={!addressProvided || !flowProvided || !tokenProvided}
				onClick={() => {
					createFlow();
				}}
			>
				{loading ? <Loader /> : 'Create Stream'}
			</button>
		</div>
	);
};
