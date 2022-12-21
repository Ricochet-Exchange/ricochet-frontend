import React, { useState } from 'react';
import { supportedCurrencies } from 'constants/polygon_config';
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
	const state = useShallowSelector(selectMain);

	const { balances } = state;

	return (
		<div className={styles.stream_form}>
			<label htmlFor="recipient" className={styles.label}>
				Recipient
			</label>
			<input
				className={styles.input}
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

			<label className={styles.label} htmlFor="payment">
				Monthly payment amount
			</label>
			<input
				id="payment"
				className={styles.input}
				type="number"
				placeholder="Payment Amount"
				onKeyDown={blockInvalidChar}
				min={0}
				onChange={async (e) => {
					const newFlow = await calculateFlowRate(+e.target.value);
					if (newFlow) {
						await updateFlowRate(newFlow.toString());
						setFlowStatus(true);
					}
				}}
			/>

			<label className={styles.label} htmlFor="supertoken">
				Token to stream
			</label>
			<select
				name="SuperTokens"
				id="supertoken"
				onChange={async (e) => {
					await updateSuperToken(e.target.value);
					setTokenStatus(true);
				}}
				className={styles.select}
			>
				<option value="" selected>
					Choose A Token
				</option>
				{balances
					? supportedCurrencies.map((currency) => {
							if (+balances[currency.address] > 0) {
								return (
									<option value={`${currency.address}`}>
										{currency.currency} {(+balances[currency.address]).toFixed(2)}{' '}
									</option>
								);
							}
							return '';
					  })
					: ''}
			</select>

			<button
				style={{ backgroundColor: '#79aad9' }}
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
