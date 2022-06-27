import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextInput } from 'components/common/TextInput';
import { useLang } from 'hooks/useLang';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { InvestNav } from 'components/layout/InvestNav';
import { rexReferralAddress } from 'constants/polygon_config';
import { getContract } from 'utils/getContract';
import { referralABI } from 'constants/abis';
import { AFFILIATE_STATUS, filterValidationErrors, getAffiliateStatus } from 'utils/getAffiliateStatus';
import ButtonNew from 'components/common/ButtonNew';
import styles from './styles.module.scss';

interface IProps {}

const AFFILIATE_URL_PREFIX = 'app.ricochet.exchange/#/ref/';

export const ReferContainer: React.FC<IProps> = () => {
	const { t } = useLang();
	const { address, web3 } = useShallowSelector(selectMain);
	const contract = getContract(rexReferralAddress, referralABI, web3);

	const [currentReferralId, setCurrentReferralId] = useState<string | undefined>();
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [referredBy, setReferredBy] = useState<string | undefined>();
	const [status, setStatus] = useState<AFFILIATE_STATUS | undefined>();

	useEffect(() => {
		setCurrentReferralId(address.toLowerCase().slice(0, 10));
	}, [address]);

	useEffect(() => {
		let isMounted = true;
		if (address && contract) {
			(async () => {
				const contractMethods = await contract.methods;
				const affiliate = await contractMethods.customerToAffiliate(address.toLowerCase()).call();
				if (affiliate !== '0') {
					const referral = await contractMethods.affiliates(affiliate).call();
					if (isMounted) {
						setReferredBy(referral.name);
					}
				} else {
					if (isMounted) {
						const allCookies = document.cookie ?? '';

						if (allCookies && allCookies.length > 1) {
							setReferredBy(
								allCookies
									?.split('; ')
									?.find((row) => row.startsWith('referralId='))
									?.split('=')[1],
							);
						}
					}
				}
			})();
		}

		return () => {
			isMounted = false;
		};
	}, [address, contract]);

	useEffect(() => {
		let isMounted = true;

		(async () => {
			if (address && contract) {
				const affiliateStatus = await getAffiliateStatus(contract, address, web3);
				if (isMounted) {
					setStatus(affiliateStatus);
				}
			}
		})();

		return () => {
			isMounted = false;
		};
	}, [address, contract]);

	useEffect(() => {
		let isMounted = true;

		if (status === AFFILIATE_STATUS.REGISTERING && address && contract) {
			const interval = setInterval(async () => {
				const affiliateStatus = await getAffiliateStatus(contract, address, web3, setCurrentReferralId);

				if (isMounted) {
					setStatus(affiliateStatus);
				}
			}, 5000);
			return () => clearInterval(interval);
		}

		return () => {
			isMounted = false;
		};
	}, [status, address, contract]);

	const handleReferralId = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setCurrentReferralId(value);
		setValidationErrors(filterValidationErrors(value));
	};

	const handleRegister = () => {
		contract.methods
			.applyForAffiliate(currentReferralId, currentReferralId)
			.call()
			.then(() => setStatus(AFFILIATE_STATUS.REGISTERING))
			.then(() =>
				contract.methods.applyForAffiliate(currentReferralId, currentReferralId).send({ from: address }),
			)
			.catch((err: Error) => {
				setStatus(AFFILIATE_STATUS.INACTIVE);
				setValidationErrors(['Error registering this url: possible duplicate. Please try another url']);
				console.error(err);
			});
	};

	const handleCopy = () => {
		navigator.clipboard.writeText(`${AFFILIATE_URL_PREFIX}${currentReferralId}`).catch();
	};

	if (!address) {
		return (
			<div className={styles.container_special}>
				<InvestNav />
				<div className={styles.container_explain}>
					{t('You have to connect your wallet to be able to create referrals')}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.outer_container}>
			<div className={styles.container}>
				<div>
					{referredBy ? (
						<span>
							{t('You have been referred with ❤️ by ')}
							{referredBy}
						</span>
					) : (
						<span>{t("You haven't been referred by anyone. 🥒 Organic FTW!")}</span>
					)}
					<div className={styles.explainer_container}>
						<p>
							<strong>V0 BETA</strong>{' '}
							{t(
								'Ricochet Referral system is in BETA. Apply to refer your friends and receive a % of fees that Ricochet Exchange charges. Becoming an affiliate currently requires manual verification. Any links you register can stop working suddenly and without any prior notice when we upgrade versions. We cannot guarantee that referrals will be applied correctly.',
							)}
						</p>
					</div>
				</div>
				{(status === AFFILIATE_STATUS.INACTIVE || status === AFFILIATE_STATUS.REGISTERING) && (
					<div className={styles.input_wrap}>
						<p>{t('Customise your referral url')}</p>
						<TextInput
							value={currentReferralId}
							placeholder={t('Your new referral id')}
							onChange={handleReferralId}
							className={styles.input}
							containerClassName={styles.container_input}
							left={<div className={styles.hint}>{AFFILIATE_URL_PREFIX}</div>}
						/>
						<div className={styles.validation_errors}>
							{validationErrors.map((each) => (
								<p key={each}>{t(each)}</p>
							))}
						</div>
						<div className={styles.register_wrap}>
							<ButtonNew
								color="primary"
								loaderColor="#363B55"
								disabled={validationErrors.length > 0}
								isLoading={status === 'registering'}
								onClick={handleRegister}
								className={styles.register}
							>
								{t('Register')}
							</ButtonNew>
						</div>
					</div>
				)}

				{status === AFFILIATE_STATUS.AWAITING_VERIFICATION && (
					<div>
						<p>
							{t('Awaiting verification. Come back later or ping us on our discord:')}
							<a
								className={styles.black}
								href="https://discord.gg/mss4t2ED3y"
								target="_blank"
								rel="noreferrer"
							>
								https://discord.gg/mss4t2ED3y
							</a>
						</p>
					</div>
				)}

				{status === AFFILIATE_STATUS.ENABLED && (
					<div className={styles.input_wrap}>
						<TextInput
							readOnly
							value={`${AFFILIATE_URL_PREFIX}${currentReferralId}`}
							className={styles.input_static}
							containerClassName={styles.container_input}
							right={
								<button className={styles.button_as_text} onClick={handleCopy}>
									copy
								</button>
							}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
