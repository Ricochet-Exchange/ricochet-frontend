import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { rexShirtWaterdrop } from 'constants/polygon_config';
import AlluoToken from 'assets/images/alluo-logo.png';
import Uniwhales from 'assets/images/uniwhales.png';
import RexShirtToken from 'assets/images/rex-shirt-logo.png';
import { gas } from 'api/gasEstimator';
import FlowingBalance from 'components/common/AnimatedAmount';

interface claimDetailsProps {
	deadline?: string;
	duration?: string;
	rate?: string;
	token?: string;
}

interface waterdrop {
	contract: any;
	waterdropAddress: string;
	name: string;
}

export const ClaimRow: FC<waterdrop> = ({ contract, waterdropAddress, name }) => {
	const { address, web3 } = useShallowSelector(selectMain);
	const [claimDetails, setClaimDetails] = React.useState<claimDetailsProps>();
	const [btnStatus, setButtonStatus] = React.useState<string>('Loading...');
	const [claimedSoFar, setClaimedSoFar] = React.useState<number | string>('0');
	const [timestamp, setTimestamp] = React.useState('0');
	const [flow, setFlow] = React.useState('0');

	const claimAccess = '0';

	React.useEffect(() => {
		(async () => {
			if (contract && address && claimDetails && btnStatus !== 'Loading...') {
				contract.methods
					.getFlow(address)
					.call()
					.then((res: any) => {
						let startTime = res.timestamp;
						setTimestamp(res.timestamp);
						const timen = new Date().getTime();
						const time = new Date().getTime() / 1000;
						const newTime = time - +startTime;
						setFlow(claimDetails?.rate!);
						const totalClaimedSoFar = newTime * claimDetails.rate;
						const totalClaimedAmount = claimDetails?.rate! * claimDetails?.duration!;

						console.log(totalClaimedAmount, totalClaimedSoFar);

						if (startTime && parseInt(totalClaimedSoFar) > totalClaimedAmount && btnStatus === 'Claimed') {
							setClaimedSoFar(totalClaimedAmount!);
							return totalClaimedAmount;
						} else if (startTime && btnStatus === 'Claimed') {
							setClaimedSoFar(totalClaimedSoFar!);
							return totalClaimedSoFar;
						} else {
							return '-';
						}
					})
					.catch((error: any) => {
						console.log('error', error);
					});
			}
		})();
	}, [address, contract, btnStatus, claimDetails]);

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
			contract.methods
				.hasClaimed(address)
				.call()
				.then((res: boolean) => {
					res ? setButtonStatus('Claimed') : findStatus();
				});
		}
	}, []);

	//Methods: To-do use Utils or more these to utils

	const getTokenIcon = (name: string) => {
		switch (name) {
			case 'uniwhales':
				return Uniwhales;
			case 'alluo':
				return AlluoToken;
			case 'rexshirt':
				return RexShirtToken;
			default:
				break;
		}
	};

	const getWaterDropName = (name: string) => {
		switch (name) {
			case 'uniwhales':
				return 'Uniwhales Waterdrop';
			case 'alluo':
				return 'Alluo Waterdrop';
			case 'rexshirt':
				return 'Rexshirt Waterdrop';
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

	//Retrieve waterdrop data (token, rate, duration, deadline)
	React.useEffect(() => {
		if (address && contract) {
			(async () => {
				if (claimAccess) {
					contract.methods
						.waterDrop()
						.call()
						.then((res: any) => {
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
									<img src={getTokenIcon(name)} alt={''} width="27" height="27"></img>
									<div className={styles.token_text}>{getWaterDropName(name)}</div>
								</div>
								<div className={styles.amount_section}>
									{((Number(claimDetails?.rate) * Number(claimDetails?.duration)) / 10 ** 18).toFixed(
										2,
									)}{' '}
									/ {waterdropAddress === rexShirtWaterdrop ? 'RexShirt Token' : 'RIC Token'}
								</div>
								<div className={styles.duration_section}>
									{' '}
									{claimDetails && secondsToDays(Number(claimDetails.duration))} days
								</div>
								<div className={styles.deadline_section}>
									{claimDetails && epochToDate(claimDetails.deadline ?? '')}
								</div>
								<div className={styles.deadline_section}>
									{claimedSoFar > 0 && flow > 0 && (
										<FlowingBalance
											balance={claimedSoFar}
											flowRate={flow}
											balanceTimestamp={timestamp}
										/>
									)}
								</div>
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
