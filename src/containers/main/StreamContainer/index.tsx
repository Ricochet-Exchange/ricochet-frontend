import React, { useState, useCallback } from 'react';
import { Framework } from '@superfluid-finance/sdk-core';
import { FontIcon, FontIconName } from 'components/common/FontIcon';
import { ethers } from 'ethers';
import FailCard from 'pages/PaymentsPage/layout/checkout/FailCard';
import { showErrorToast, showSuccessToast } from '../../../components/common/Toaster';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { gas } from 'api/gasEstimator';
import styles from './styles.module.scss';
import { StreamForm } from 'pages/PaymentsPage/layout/checkout/StreamForm';

export const StreamContainer = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [recipient, setRecipient] = useState('');
	const [superToken, setSuperToken] = useState('');
	const [flowRate, setFlowRate] = useState('');
	const [transactionSuccess, ToggleTransaction] = useState(false);
	const [transactionFailed, ToggleFail] = useState(false);
	const [recentActivity] = useState(false);

	const { web3 } = useShallowSelector(selectMain);

	const createNewFlow = React.useCallback(async () => {
		setIsLoading(true);
		if (web3) {
			const provider = new ethers.providers.Web3Provider(web3.currentProvider as any);
			const chainId = Number(process.env.REACT_APP_CHAIN_ID);

			const sf = await Framework.create({
				chainId: Number(chainId),
				provider,
			});

			const signer = provider.getSigner();

			try {
				const createFlowOperation = sf.cfaV1.createFlow({
					flowRate,
					receiver: recipient,
					superToken,
					overrides: {
						...(await gas()),
					},
				});
				await createFlowOperation.exec(signer);
				showSuccessToast('Stream opened successfully');
				ToggleTransaction(true);
			} catch (e) {
				showErrorToast('Could not open stream, check if you have an open stream already.');
				ToggleTransaction(false);
				ToggleFail(true);
			}
		}
		setIsLoading(false);
	}, [flowRate, recipient, superToken, web3]);

	const handleStartStream = useCallback(() => {
		createNewFlow();
	}, [createNewFlow]);

	const updateFlowRate = (flow: string): void => {
		setFlowRate(flow);
	};

	const updateRecipient = (address: string): void => {
		setRecipient(address);
	};

	const updateSuperToken = (token: string): void => {
		setSuperToken(token);
	};

	const renderStream = () => {
		if (!transactionSuccess && !transactionFailed && !recentActivity) {
			return (
				<StreamForm
					loading={isLoading}
					updateRecipient={updateRecipient}
					updateFlowRate={updateFlowRate}
					updateSuperToken={updateSuperToken}
					createFlow={handleStartStream}
				/>
			);
		}
		if (transactionSuccess && !recentActivity) {
			return (
				<div className={styles.stream_form_container}>
					<>
						<h3 className={styles.success}>Success</h3>
						<h3 className={styles.result}>
							Your stream has been created, you can view or edit your stream in the Activity Page.
						</h3>
					</>
				</div>
			);
		}
		if (transactionFailed && !recentActivity) {
			return (
				<>
					<button
						onClick={() => {
							ToggleFail(false);
							ToggleTransaction(false);
						}}
						className={styles.close_btn}
					>
						<FontIcon name={FontIconName.Close} className={styles.close} size={24} />
					</button>
					<h2 className={styles.warning}>Stream Failed</h2>

					<FailCard />
				</>
			);
		}
	};

	return (
		<>
			<div className={styles.stream_panel_container}>{renderStream()}</div>
		</>
	);
};
