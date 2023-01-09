import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { useQuery } from '@apollo/client';
import { RexShirtAddress, RICAddress } from 'constants/polygon_config';
import AlluoToken from 'assets/images/alluo-logo.png';
import RexShirtToken from 'assets/images/rex-shirt-logo.png';
import { gas } from 'api/gasEstimator';

interface claimDetailsProps {
	deadline?: string;
	duration?: string;
	rate?: string;
	token?: string;
}

interface waterdrop {
	contract: any;
	waterdropAddress: string;
	query: any;
}

export const ClaimRow: FC<waterdrop> = ({ contract, waterdropAddress, query }) => {
	const { address, web3 } = useShallowSelector(selectMain);
	const { loading, data } = useQuery(query!, {});
	const [claimDetails, setClaimDetails] = React.useState<claimDetailsProps>();
	const [btnStatus, setButtonStatus] = React.useState<string>();

	const claimAccess = '0';

	let startTime = '';

	if (data && address && !loading) {
		data?.account?.outflows?.map((item: any) => {
			if (item.receiver.id.toLowerCase() === address.toLowerCase()) {
				startTime = item.flowUpdatedEvents[0].stream.createdAtTimestamp;
			}
		});
	}

	React.useEffect(() => {
		const findStatus = async () => {
			let tx = await contract.methods.claim();
			await tx
				.estimateGas({ from: address })
				.then((response: any) => setButtonStatus('Claim'))
				.catch((error: any) => {
					setButtonStatus('Ineligible');
					console.log('err', error);
				});
		};

		if (contract && address) {
			const hasClaimed = contract.methods
				.hasClaimed(address)
				.call()
				.then((res: boolean) => {
					res ? setButtonStatus('Claimed') : findStatus();
				});
		}
	}, []);

	//Methods: To-do use Utils or more these to utils

	const getTokenIcon = (tokenAddress: string) => {
		switch (tokenAddress) {
			//Rexshirt icon
			case RICAddress:
				return AlluoToken;
			//Alluo icon
			case RexShirtAddress:
				return RexShirtToken;
			default:
				break;
		}
	};

	const getWaterDropName = (tokenAddress: string) => {
		switch (tokenAddress) {
			case RexShirtAddress:
				return 'Rex Shirt Waterdrop';
			case RICAddress:
				return 'Alluo Waterdrop';
			default:
				break;
		}
	};

	const secondsToDays = (seconds: number) => {
		const days = Math.floor(seconds / (3600 * 24));
		return days;
	};

	const epochToDate = (epoch: string) => {
		if (epoch !== '0') {
			const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
			date.setUTCSeconds(Math.round(Number(epoch)));
			const formattedDate = date.getUTCDate() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCFullYear();
			return formattedDate;
		} else {
			return 'No Deadline';
		}
	};

	const claimAmountStatus = () => {
		const totalClaimedSoFar = (
			((Math.floor(new Date().getTime() / 1000.0) - parseInt(startTime)) * parseInt(claimDetails?.rate!)) /
			1e18
		).toFixed(6);
		const totalClaimedAmount = Math.round(
			(parseInt(claimDetails?.rate || '') * parseInt(claimDetails?.duration || '')) / 1e18,
		);

		if (startTime?.length && parseInt(totalClaimedSoFar) > totalClaimedAmount) {
			return totalClaimedAmount;
		} else if (startTime) {
			console.log(totalClaimedSoFar);
			return totalClaimedSoFar;
		} else {
			return '-';
		}
	};

	//Retrieve waterdrop data (token, rate, duration, deadline)
	React.useEffect(() => {
		if (address && contract) {
			(async () => {
				if (claimAccess) {
					contract.methods
						.waterDrop()
						.call()
						.then((res: any) => {
							console.log('res', res);
							setClaimDetails(res);
						})
						.catch((error: any) => {
							console.log('error', error);
						});
				}
			})();
		}
	}, [address, claimAccess]);

	//Claim Waterdrop
	const handleClaim = React.useCallback(async () => {
		if (!web3.currentProvider || !contract) {
			console.log('fail');
			return;
		}
		let tx = await contract.methods.claim();
		const trigger = async () =>
			tx.send({
				from: address,
				...(await gas()),
			});
		//Estimate gas, if transaction will succeed, then make transaction, else throw error and show userz
		trigger();
	}, [address, contract]);

	return (
		<div>
			<div className={styles.panel}>
				<section className={styles.section}>
					<div className={styles.section_wrapper}>
						<div className={styles.content_container}>
							<div className={styles.wrapper}>
								<div className={styles.token_section}>
									<img src={getTokenIcon(claimDetails?.token!)} alt={''} width="27" height="27"></img>
									<div className={styles.token_text}>
										{getWaterDropName(claimDetails?.token || '')}
									</div>
								</div>
								<div className={styles.amount_section}>
									{((Number(claimDetails?.rate) * Number(claimDetails?.duration)) / 10 ** 18).toFixed(
										2,
									)}
								</div>
								<div className={styles.duration_section}>
									{' '}
									{secondsToDays(Number(claimDetails?.duration))} days
								</div>
								<div className={styles.deadline_section}>
									{epochToDate(claimDetails?.deadline ?? '')}
								</div>
								<div className={styles.deadline_section}>{claimAmountStatus()}</div>
								<div className={styles.claim_section}>
									<button
										className={styles.claim_button}
										disabled={btnStatus !== 'Claim'}
										onClick={handleClaim}
									>
										{btnStatus}
									</button>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};
