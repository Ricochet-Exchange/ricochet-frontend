import React, { ChangeEvent, useEffect, useState } from 'react';
import { TextInput } from 'components/common/TextInput';
import { useLang } from 'hooks/useLang';
import { useShallowSelector } from 'hooks/useShallowSelector';
import { selectMain } from 'store/main/selectors';
import { rexReferralAddress } from 'constants/polygon_config';
import { getContract } from 'utils/getContract';
import { referralABI } from 'constants/ABIs/referralABI';
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
		if (!contract) {
			setCurrentReferralId(address.toLowerCase().slice(0, 10));
			return;
		}
		const setReferralId = async () => {
			let currentReferralId = await contract.methods.addressToAffiliate(address.toLowerCase()).call();
			if (currentReferralId !== '0') {
				currentReferralId = await contract.methods.affiliates(currentReferralId).call();
				setCurrentReferralId(currentReferralId.name);
				return;
			}
		};
		setReferralId();
	}, [address, contract]);

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
	}, [address, contract, web3]);

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
	}, [status, address, contract, web3]);

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
			<div className={styles.container_explain}>
				{t('You have to connect your wallet to be able to create referrals')}
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
							dontBlockChar
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

				<div className={styles.how_it_works_container}>
					<div className={styles.how_it_works}>How it works?</div>
					<div className={styles.how_it_works_section}>
						<div>
							<div className={styles.how_it_works_steps}>Step 1: Choose a Affiliate ID</div>
							<p className={styles.how_it_works_content}>
								Go to the REX Referral page:{' '}
								<a
									href="https://ricochet-exchange.eth.limo/#/refer"
									target="_blank"
									rel="noopener noreferrer"
								>
									https://ricochet-exchange.eth.limo/#/refer
								</a>{' '}
								. Enter your personalized referral URL provided on the page or use your address which is
								the default URL. Then click Register
							</p>
							<div className={styles.how_it_works_steps}>Step 2: Register your Affiliate ID</div>
							<p className={styles.how_it_works_content}>
								After you click register, you'll receive a signature request from your Metamask wallet
								for the link registration fee. Sign the request to proceed with your registration.
								Someone from the core team will need to approve your registration.
							</p>
							<div className={styles.how_it_works_steps}>Step 3: Ask for Approval in Discord</div>
							<p className={styles.how_it_works_content}>
								After successfully registering your referral link, you will enter an approval period.
								You should see the message "Awaiting verification. Come back later" message. This is
								completed on the Ricochet discord. Ask in the #support channel to be approved.
								<br />
								<a href="https://discord.gg/ptqCBnJ9dr" target="_blank" rel="noopener noreferrer">
									https://discord.gg/ptqCBnJ9dr
								</a>
							</p>
							<div className={styles.how_it_works_steps}>Step 4: Share your link</div>
							<p className={styles.how_it_works_content}>
								Once approved, share your referral link with others and start earning!
							</p>
							<div className={styles.how_it_works}>Why should become an Affiliate?</div>
							<p className={styles.how_it_works_content}>
								As an affiliate <b>you receive 50% of the fees charged by Ricochet</b> to accounts you
								refer. If you refer an account that DCAs $1000 with the protocol, Ricochet charges a 2%
								fee for the transaction, you would earn $10 (50% of the $20 fee). These rewards can
								provide a significant source of income if you are able to successfully refer a large
								amount of volume to the protocol.
								<br />
								<br />
								You can get registered as an affiliate <b>TODAY</b>. Just click on this link
								app.ricochet.exchange, follow the steps above and start earning away! The Referral
								System is completely on-chain and you'll receive your rewards every few hours.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
