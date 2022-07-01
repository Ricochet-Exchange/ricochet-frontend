import React, { FC, useEffect, useState } from 'react';
import { getSFFramework } from 'utils/fluidSDKinstance';
import Web3 from 'web3';
import type { Row } from './types';
import { calculateReceived } from './utils/calculateReceived';

type ReceivedPlaceholderProps = Pick<Row, 'exchangeAddress' | 'superToken'> & {
	distributions: any;
	account: string;
	web3: Web3;
	token: string;
};

export const ReceivedPlaceholder: FC<ReceivedPlaceholderProps> = ({
	distributions,
	exchangeAddress,
	superToken: tokenB,
	account,
	web3,
	token,
}) => {
	const [received, setReceived] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (!distributions) return;
		let isMounted = true;

		(async () => {
			const currentDistribution = distributions.find(
				(distribution: any) =>
					distribution.index.publisher.id === exchangeAddress.toLowerCase() &&
					distribution.index.token.id === tokenB.toLowerCase(),
			);

			if (currentDistribution) {
				const superToken = Web3.utils.toChecksumAddress(tokenB);
				const publisher = Web3.utils.toChecksumAddress(exchangeAddress);
				const subscriber = Web3.utils.toChecksumAddress(account);
				const { indexValueUntilUpdatedAt, index, units } = currentDistribution;
				try {
					const framewrok = await getSFFramework(web3);
					const subscriptionDetail = await framewrok.idaV1.getSubscription({
						superToken,
						publisher,
						indexId: index.indexId,
						subscriber,
						providerOrSigner: framewrok.settings.provider,
					});
					const _received = calculateReceived(
						index.indexValue,
						indexValueUntilUpdatedAt,
						units || subscriptionDetail.units,
					);
					if (isMounted) {
						setReceived(_received);
					}
				} catch (error) {
					console.error('containers/InvestContainer/ReceivedPlaceholder.tsx: ', error);
				}
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [account, distributions, exchangeAddress, tokenB, web3]);

	return <span>{received ? `${(+received).toFixed(6)} ${token}` : '-'}</span>;
};
