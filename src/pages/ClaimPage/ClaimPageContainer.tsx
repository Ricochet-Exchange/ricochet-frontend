import React, { FC } from 'react';
import styles from './styles.module.scss';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { getContract } from 'utils/getContract';
import { alluoWaterdrop, rexShirtWaterdrop } from 'constants/polygon_config';
import { conditionalWaterdrop } from 'constants/ABIs/conditionalWaterdrop';
import { ClaimRow } from './ClaimRow';

interface IProps {
	address?: string;
	balance?: string;
}

interface waterdrop {
	contract: {};
	waterdropAddress: string;
}

export const ClaimPageContainer: FC<IProps> = () => {
	const { address, web3 } = useShallowSelector(selectMain);
	//Create an array of contracts, then pass down in a map to claim row for generation.

	const rexShirtWaterdropContract = getContract(rexShirtWaterdrop, conditionalWaterdrop, web3);
	const alluoWaterdropContract = getContract(alluoWaterdrop, conditionalWaterdrop, web3);

	const waterdrops: waterdrop[] = [
		{
			contract: rexShirtWaterdropContract!,
			waterdropAddress: rexShirtWaterdrop,
		},
		{
			contract: alluoWaterdropContract!,
			waterdropAddress: alluoWaterdrop,
		},
	];

	return (
		<>
			{address?.length ? (
				<div className={styles.page_wrapper}>
					<div className={styles.container}>
						<div className={styles.heading}>Your Gifts:</div>
						<div className={styles.headers}>
							<div className={styles.market}>{'Token'}</div>
							<div className={styles.stream}>{'Amount'}</div>
							<div className={styles.balances}>{'Duration'}</div>
							<div className={styles.streaming}>{'Deadline'}</div>
							<div className={styles.streaming}>{'Total Claimed'}</div>
							<div className={styles.streaming}>{'Claim'}</div>
						</div>
						{waterdrops.map((waterdrop, i) => {
							return (
								<ClaimRow
									key={`waterdrop-${i}`}
									contract={waterdrop.contract}
									waterdropAddress={waterdrop.waterdropAddress}
								/>
							);
						})}
					</div>
				</div>
			) : (
				<div className={styles.container}>
					<div className={styles.noClaimAccess}>Please connect wallet to see your claims.</div>
				</div>
			)}
		</>
	);
};
