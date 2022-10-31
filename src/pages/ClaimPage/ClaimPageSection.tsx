/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable */
import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { getContract } from 'utils/getContract';
import { claimAddress } from 'constants/polygon_config';
import { claimABI } from 'constants/abis';
import { gas } from 'api/gasEstimator';
import RICToken from 'assets/images/coins/RicochetLogo.svg';

interface IProps {
	address?: string;
	balance?: string;
}

interface claimDetailsProps {
	deadline?: string;
	duration?: string;
	rate?: string;
	token?: string;
}
[];
export const ClaimPageSection: FC<IProps> = () => {
	const { address, web3 } = useShallowSelector(selectMain);
	const contract = getContract(claimAddress, claimABI, web3);

	const [claimAccess, setClaimAccess] = React.useState('0');
	const [claimDetails, setClaimDetails] = React.useState<claimDetailsProps>();
	const getTokenIcon = (tokenAddress: string) => {
		switch (tokenAddress) {
			case '0x263026E7e53DBFDce5ae55Ade22493f828922965':
				return RICToken;

			default:
				break;
		}
	};

	const getWaterDropName = (tokenAddress: string) => {
		switch (tokenAddress) {
			case '0x263026E7e53DBFDce5ae55Ade22493f828922965':
				return 'RIC Community Waterdrop';

			default:
				break;
		}
	};

	const secondsToDays = (seconds: number) => {
		const days = Math.floor(seconds / (3600 * 24));
		return days;
	};

	const epochToDate = (epoch: string) => {
		const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
		date.setUTCSeconds(Math.round(Number(epoch)));
		const formattedDate = date.getUTCDate() + '-' + (date.getUTCMonth() + 1) + '-' + date.getUTCFullYear();
		return formattedDate;
	};

	React.useEffect(() => {
		(async () => {
			contract.methods
				.userClaims(address)
				.call()
				.then((res: any) => {
					setClaimAccess(res);
				})
				.catch((error: any) => {
					console.log('error', error);
				});
			if (claimAccess) {
				contract.methods
					.claims(1)
					.call()
					.then((res: any) => {
						setClaimDetails(res);
					})
					.catch((error: any) => {
						console.log('error', error);
					});
			}
		})();
	}, [address, claimAccess]);

	const handleClaim = React.useCallback(async () => {
		if (!web3.currentProvider) {
			console.log('fail');
			return;
		}

		const contract = getContract(claimAddress, claimABI, web3);
		await contract.methods
			.claim()
			.send({
				from: address,
				...(await gas()),
			})
			.then((res: any) => {
				console.log('response', res);
			})
			.catch((error: any) => {
				console.log('error', error);
			});
	}, [address]);

	return (
		<>
			<div className={styles.page_wrapper}>
				{Number(claimAccess) && Number(address) ? (
					<div className={styles.container}>
						<div className={styles.heading}>Your Gifts:</div>
						<div className={styles.headers}>
							<div className={styles.market}>{'Token'}</div>
							<div className={styles.stream}>{'Amount'}</div>
							<div className={styles.balances}>{'Duration'}</div>
							<div className={styles.streaming}>{'Deadline'}</div>
							<div className={styles.streaming}>{'Claim'}</div>
						</div>
						<div>
							<div className={styles.panel}>
								<section className={styles.section}>
									<div className={styles.section_wrapper}>
										<div className={styles.content_container}>
											<div className={styles.wrapper}>
												<div className={styles.token_section}>
													<img
														src={getTokenIcon(claimDetails?.token || '')}
														alt={'alluologo'}
														width="27"
														height="27"
													></img>
													<div className={styles.token_text}>
														{getWaterDropName(claimDetails?.token || '')}
													</div>
												</div>
												<div className={styles.amount_section}>
													{Math.round(
														(parseInt(claimDetails?.rate || '') *
															parseInt(claimDetails?.duration || '')) /
															1e18,
													)}
												</div>
												<div className={styles.duration_section}>
													{' '}
													{secondsToDays(Number(claimDetails?.duration))} days
												</div>

												<div className={styles.deadline_section}>
													{epochToDate(claimDetails?.deadline ?? '')}
												</div>
												<div className={styles.claim_section}>
													<button className={styles.claim_button} onClick={handleClaim}>
														Claim
													</button>
												</div>
											</div>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.container}>
						<div className={styles.noClaimAccess}>you don't have access to claim for waterdrop</div>
					</div>
				)}
			</div>
		</>
	);
};
